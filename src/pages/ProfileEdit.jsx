import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// --- NEW IMPORT: Use the installed library for countries and cities ---
import { Country, City } from 'country-state-city';

// --- Helper function to update nested state properties immutably ---
const updateNestedProperty = (obj, path, value) => {
    const keys = path.split('.');
    const newObj = JSON.parse(JSON.stringify(obj));
    let current = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') current[key] = {};
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return newObj;
};

// --- Reusable Input Field Component ---
const InputField = ({ id, label, value, onChange, name, placeholder = '', type = 'text', readOnly = false, isRequired = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input type={type} id={id} name={name} value={value || ''} onChange={onChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder={placeholder} readOnly={readOnly} required={isRequired} />
    </div>
);

// --- ProfileEdit Page Component ---
const ProfileEdit = ({ currentUser, db }) => {
    const navigate = useNavigate();
    // --- State Hooks ---
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [skillInput, setSkillInput] = useState('');
    // NEW: States for the country/city dropdowns
    const [allCountries, setAllCountries] = useState([]);
    const [citiesForSelectedCountry, setCitiesForSelectedCountry] = useState([]);

    // --- State for File Uploads ---
    const [photoFile, setPhotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [portfolioFiles, setPortfolioFiles] = useState({});
    const [uploadProgress, setUploadProgress] = useState({});

    const storage = getStorage();

    // --- EFFECT 1: Fetch countries and initialize cities on mount ---
    useEffect(() => {
        // Fetch all countries once when the component mounts
        const countries = Country.getAllCountries();
        setAllCountries(countries);

        // Fetch user data and initialize the city dropdown
        const fetchProfileData = async () => {
            if (!currentUser) {
                navigate('/login');
                return;
            }
            setIsLoading(true);
            const userProfileRef = doc(db, "userProfiles", currentUser.uid);
            const publicProfileRef = doc(db, "public_profiles", currentUser.uid);
            try {
                const [userDocSnap, publicDocSnap] = await Promise.all([
                    getDoc(userProfileRef),
                    getDoc(publicProfileRef)
                ]);

                let initialProfileData = {
                    basicDetails: { name: "", photoURL: "", titleTagline: "", location: { city: "", country: "" }, contact: { email: currentUser.email || "", phone: "", linkedin: "", github: "", website: "" } },
                    bioSkills: { bio: "", skills: [] },
                    experience: [], education: [], portfolio: [], cvUpload: { fileName: "", fileURL: "" },
                    availabilityRate: { status: "Not Set", hourlyRate: "", projectRate: "", currency: "USD" },
                    reviewsRatings: { averageRating: 0, breakdown: {}, excerpts: [] },
                    metricsVisibility: { profileViews: 0, lastActive: new Date().toISOString(), endorsementBadges: [] }
                };

                if (userDocSnap.exists()) {
                    initialProfileData = { ...initialProfileData, ...userDocSnap.data() };
                }
                if (publicDocSnap.exists()) {
                    initialProfileData.publicDetails = publicDocSnap.data();
                } else {
                    initialProfileData.publicDetails = {
                        displayName: currentUser.displayName || "", photoURL: "", headline: "", skills: [], bio: "",
                        location: { city: "", country: "" }, experienceLevel: 'Not Set', uid: currentUser.uid,
                    };
                }

                if (!initialProfileData.basicDetails.name) initialProfileData.basicDetails.name = currentUser.displayName || "";
                if (!initialProfileData.basicDetails.contact.email) initialProfileData.basicDetails.contact.email = currentUser.email || "";

                setProfileData(initialProfileData);

                // --- NEW LOGIC: Initialize cities list based on fetched country ---
                const initialCountryCode = initialProfileData.basicDetails.location?.country;
                if (initialCountryCode) {
                    const cities = City.getCitiesOfCountry(initialCountryCode);
                    if (cities) setCitiesForSelectedCountry(cities);
                }

            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load your profile. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [currentUser, db, navigate]);


    // --- NEW HANDLER: For the country dropdown ---
    const handleCountryChange = (e) => {
        const selectedCountryCode = e.target.value;
        // 1. Update the country in the state using the country's ISO code
        setProfileData(prev => updateNestedProperty(prev, 'basicDetails.location.country', selectedCountryCode));
        
        // 2. Update the list of cities for the new country
        const cities = City.getCitiesOfCountry(selectedCountryCode);
        setCitiesForSelectedCountry(cities || []);
        
        // 3. Reset the city to an empty string to force a new selection
        setProfileData(prev => updateNestedProperty(prev, 'basicDetails.location.city', ''));
    };

    // --- Handlers (mostly unchanged) ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => updateNestedProperty(prev, name, value));
    };
    
    const handleAddSkill = () => {
        if (skillInput && !profileData.bioSkills.skills.includes(skillInput)) {
            const newSkills = [...profileData.bioSkills.skills, skillInput];
            setProfileData(prev => ({ ...prev, bioSkills: { ...prev.bioSkills, skills: newSkills } }));
            setSkillInput('');
        }
    };
    
    const handleRemoveSkill = (skillToRemove) => {
        const newSkills = profileData.bioSkills.skills.filter(skill => skill !== skillToRemove);
        setProfileData(prev => ({ ...prev, bioSkills: { ...prev.bioSkills, skills: newSkills } }));
    };

    const handleAddItem = (arrayName) => {
        const newItem = arrayName === 'experience' 
            ? { title: '', company: '', startDate: '', endDate: '', description: '' }
            : arrayName === 'education'
            ? { school: '', degree: '', startDate: '', endDate: '' }
            : { title: '', description: '', imageURL: '', projectLink: '' };
        setProfileData(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), newItem] }));
    };
    
    const handleRemoveItem = (arrayName, index) => {
        const newArray = profileData[arrayName].filter((_, i) => i !== index);
        setProfileData(prev => ({...prev, [arrayName]: newArray}));
    };

    const handleItemChange = (arrayName, index, e) => {
        const { name, value } = e.target;
        const newArray = [...profileData[arrayName]];
        newArray[index][name] = value;
        setProfileData(prev => ({ ...prev, [arrayName]: newArray }));
    };
    
    const handlePortfolioFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) setPortfolioFiles(prev => ({ ...prev, [index]: file }));
    };

    const handleFileUpload = (file, type, identifier) => {
        if (!file) return Promise.resolve(null);
        const filePath = `${currentUser.uid}/${type}/${identifier}_${file.name}`;
        const storageRef = ref(storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const progressKey = type === 'portfolio' ? `portfolio_${identifier}` : type;
                    setUploadProgress(prev => ({ ...prev, [progressKey]: progress }));
                }, (error) => {
                    console.error(`Upload failed for ${type}:`, error);
                    reject(error);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({ url: downloadURL, name: file.name });
                    });
                }
            );
        });
    };

    // --- Save Profile Handler (mostly unchanged) ---
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true); setError(''); setStatusMessage('Saving...');
        try {
            let finalProfileData = { ...profileData };
            if (photoFile) {
                setStatusMessage('Uploading profile photo...');
                const result = await handleFileUpload(photoFile, 'photo', 'profile_photo');
                if (result) {
                    finalProfileData.basicDetails.photoURL = result.url;
                    finalProfileData.publicDetails.photoURL = result.url;
                }
            }
            if (cvFile) {
                setStatusMessage('Uploading CV...');
                const result = await handleFileUpload(cvFile, 'cv', 'user_cv');
                if (result) finalProfileData.cvUpload = { fileName: result.name, fileURL: result.url };
            }
            const portfolioUploadPromises = Object.keys(portfolioFiles).map(async (index) => {
                setStatusMessage(`Uploading portfolio item ${parseInt(index) + 1}...`);
                const file = portfolioFiles[index]; const result = await handleFileUpload(file, 'portfolio', `item_${index}`);
                if (result) finalProfileData.portfolio[index].imageURL = result.url;
            });
            await Promise.all(portfolioUploadPromises);
            
            setStatusMessage('Saving full profile data...');
            const userProfileRef = doc(db, "userProfiles", currentUser.uid);
            await setDoc(userProfileRef, finalProfileData, { merge: true });

            setStatusMessage('Updating public profile...');
            const publicProfileRef = doc(db, 'public_profiles', currentUser.uid);
            const publicProfileData = {
              uid: currentUser.uid,
              displayName: finalProfileData.basicDetails.name,
              photoURL: finalProfileData.basicDetails.photoURL,
              headline: finalProfileData.basicDetails.titleTagline,
              skills: finalProfileData.bioSkills.skills,
              bio: finalProfileData.bioSkills.bio,
              location: finalProfileData.basicDetails.location.city,
              experienceLevel: finalProfileData.publicDetails.experienceLevel,
              lastActive: new Date().toISOString(),
            };
            await setDoc(publicProfileRef, publicProfileData, { merge: true });
            
            setProfileData(finalProfileData); setPhotoFile(null); setCvFile(null); setPortfolioFiles({});
            setStatusMessage("Profile saved successfully!");
            setTimeout(() => navigate('/profile'), 1500);
        } catch (err) {
            console.error("Error saving profile:", err);
            setError("Failed to save profile. An error occurred. Please check console for details.");
            setStatusMessage('');
        } finally {
            setIsLoading(false); setUploadProgress({});
        }
    };
    
    // --- Render Logic ---
    if (isLoading && !profileData) {
        return <div className="flex justify-center items-center min-h-screen"><div className="text-xl font-semibold">Loading...</div></div>;
    }
    if (error) {
        return <div className="flex justify-center items-center min-h-screen"><div className="text-red-600">{error}</div></div>;
    }
    if (!profileData) return null;

    return (
        <div className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">{profileData.basicDetails.name ? 'Edit Profile' : 'Complete Your Profile'}</h1>
                {statusMessage && <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${statusMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{statusMessage}</div>}
                
                <form onSubmit={handleSaveProfile} className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto space-y-10">
                    {/* --- Basic Details & Contact --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Basic Details & Contact (Public)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" name="basicDetails.name" value={profileData.basicDetails.name} onChange={handleChange} isRequired />
                            <InputField label="Headline / Title" name="basicDetails.titleTagline" value={profileData.basicDetails.titleTagline} onChange={handleChange} placeholder="e.g., Senior DevOps Engineer" isRequired />
                            
                            {/* --- UPDATED: Country Dropdown --- */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="country"
                                    name="basicDetails.location.country"
                                    value={profileData.basicDetails.location?.country || ''}
                                    onChange={handleCountryChange} // Use the new handler
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>Select a country</option>
                                    {allCountries.map(country => (
                                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* --- UPDATED: City Dropdown (Dependent) --- */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="city"
                                    name="basicDetails.location.city"
                                    value={profileData.basicDetails.location?.city || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    disabled={citiesForSelectedCountry.length === 0}
                                >
                                    <option value="" disabled>
                                        {profileData.basicDetails.location?.country ? "Select a city" : "Select a country first"}
                                    </option>
                                    {citiesForSelectedCountry.map(city => (
                                        <option key={city.name} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience Level <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    id="experienceLevel" 
                                    name="publicDetails.experienceLevel"
                                    value={profileData.publicDetails?.experienceLevel || 'Not Set'} 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="Not Set" disabled>Select Level</option>
                                    <option value="Entry-Level">Entry-Level</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Mid-Level">Mid-Level</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Lead/Principal">Lead/Principal</option>
                                </select>
                            </div>

                            <h3 className="md:col-span-2 text-lg font-semibold mt-6 mb-2">Private Contact Details (Not Public)</h3>
                            <InputField label="Contact Email" name="basicDetails.contact.email" value={profileData.basicDetails.contact?.email} readOnly />
                            <InputField label="Phone (Optional)" name="basicDetails.contact.phone" value={profileData.basicDetails.contact?.phone} onChange={handleChange} />
                            <InputField label="LinkedIn URL" name="basicDetails.contact.linkedin" value={profileData.basicDetails.contact?.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile"/>
                            <InputField label="GitHub URL" name="basicDetails.contact.github" value={profileData.basicDetails.contact?.github} onChange={handleChange} placeholder="https://github.com/yourprofile"/>
                            <InputField label="Website URL" name="basicDetails.contact.website" value={profileData.basicDetails.contact?.website} onChange={handleChange} placeholder="https://yourwebsite.com"/>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium">Profile Photo</label>
                            {profileData.basicDetails.photoURL && <img src={profileData.basicDetails.photoURL} alt="Profile" className="w-24 h-24 rounded-full my-2 object-cover border-2 border-indigo-200"/>}
                            <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} className="file-input"/>
                            {uploadProgress.photo > 0 && uploadProgress.photo < 100 && <progress value={uploadProgress.photo} max="100" className="w-full mt-2"/>}
                        </div>
                    </section>

                    {/* --- Bio & Skills --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Bio & Skills (Public)</h2>
                        <textarea name="bioSkills.bio" value={profileData.bioSkills.bio} onChange={handleChange} rows="3" className="w-full border rounded-md p-2" placeholder="A brief professional overview..." required></textarea>
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Key Skills</label>
                            <div className="flex gap-2">
                                <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="flex-grow border rounded-md p-2" placeholder="e.g., JavaScript, DevOps, UI/UX"/>
                                <button type="button" onClick={handleAddSkill} className="btn-primary min-w-[70px]">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {profileData.bioSkills.skills?.map(s => <span key={s} className="skill-tag">{s} <button type="button" onClick={() => handleRemoveSkill(s)}>&times;</button></span>)}
                            </div>
                        </div>
                    </section>

                    {/* --- Work Experience --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Work Experience</h2>
                        {profileData.experience?.map((item, index) => (
                            <div key={index} className="dynamic-item-card">
                                <InputField label="Job Title" name="title" value={item.title} onChange={(e) => handleItemChange('experience', index, e)}/>
                                <InputField label="Company" name="company" value={item.company} onChange={(e) => handleItemChange('experience', index, e)}/>
                                <textarea name="description" value={item.description} onChange={(e) => handleItemChange('experience', index, e)} placeholder="Role description..." rows="3" className="w-full border rounded-md p-2 mt-2"></textarea>
                                <button type="button" onClick={() => handleRemoveItem('experience', index)} className="remove-btn">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem('experience')} className="btn-secondary">Add Experience</button>
                    </section>
                    
                    {/* --- Education --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Education</h2>
                        {profileData.education?.map((item, index) => (
                            <div key={index} className="dynamic-item-card">
                                <InputField label="School/University" name="school" value={item.school} onChange={(e) => handleItemChange('education', index, e)}/>
                                <InputField label="Degree/Certificate" name="degree" value={item.degree} onChange={(e) => handleItemChange('education', index, e)}/>
                                <button type="button" onClick={() => handleRemoveItem('education', index)} className="remove-btn">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem('education')} className="btn-secondary">Add Education</button>
                    </section>

                    {/* --- CV Upload --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">CV Upload</h2>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files[0])} className="file-input"/>
                        {profileData.cvUpload.fileURL && <a href={profileData.cvUpload.fileURL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 mt-2 inline-block">View Current CV</a>}
                        {uploadProgress.cv > 0 && uploadProgress.cv < 100 && <progress value={uploadProgress.cv} max="100" className="w-full mt-2"/>}
                    </section>

                    {/* --- Portfolio --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Portfolio</h2>
                        {profileData.portfolio?.map((item, index) => (
                            <div key={index} className="dynamic-item-card">
                                <InputField label="Project Title" name="title" value={item.title} onChange={(e) => handleItemChange('portfolio', index, e)}/>
                                <textarea name="description" value={item.description} onChange={(e) => handleItemChange('portfolio', index, e)} placeholder="Project description..." rows="2" className="w-full border rounded-md p-2 mt-2"></textarea>
                                <InputField label="Project Link (Optional)" name="projectLink" value={item.projectLink} onChange={(e) => handleItemChange('portfolio', index, e)}/>
                                <label className="block text-sm font-medium mt-2">Project Image</label>
                                {item.imageURL && <img src={item.imageURL} alt="Portfolio item" className="w-20 h-20 object-cover my-2 rounded-md"/>}
                                <input type="file" onChange={(e) => handlePortfolioFileChange(e, index)} className="file-input"/>
                                {uploadProgress[`portfolio_${index}`] > 0 && uploadProgress[`portfolio_${index}`] < 100 && <progress value={uploadProgress[`portfolio_${index}`]} max="100" className="w-full mt-2"/>}
                                <button type="button" onClick={() => handleRemoveItem('portfolio', index)} className="remove-btn">&times;</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem('portfolio')} className="btn-secondary">Add Portfolio Item</button>
                    </section>
                    
                    {/* --- Availability & Rate --- */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Availability & Rate</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                                <select id="status" name="availabilityRate.status" value={profileData.availabilityRate?.status} onChange={handleChange} className="w-full border rounded-md p-2 mt-1">
                                    <option>Not Set</option>
                                    <option>Available</option>
                                    <option>Busy</option>
                                    <option>Freelance</option>
                                </select>
                            </div>
                            <InputField label="Hourly Rate" name="availabilityRate.hourlyRate" value={profileData.availabilityRate?.hourlyRate} onChange={handleChange} type="number"/>
                            <InputField label="Project Rate" name="availabilityRate.projectRate" value={profileData.availabilityRate?.projectRate} onChange={handleChange} type="number"/>
                            <InputField label="Currency" name="availabilityRate.currency" value={profileData.availabilityRate?.currency} onChange={handleChange} placeholder="e.g., USD"/>
                        </div>
                    </section>
                    
                    {/* Final Save Button */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Link to="/profile" className="btn-secondary">Cancel</Link>
                        <button type="submit" disabled={isLoading} className="btn-primary">
                            {isLoading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
            {/* Simple Styles for Reusable Classes */}
            <style>{`
                .btn-primary { padding: 0.5rem 1.5rem; background-color: #4f46e5; color: white; border-radius: 0.375rem; font-weight: 600; transition: background-color 0.2s; }
                .btn-primary:hover { background-color: #4338ca; }
                .btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }
                .btn-secondary { padding: 0.5rem 1.5rem; background-color: #e5e7eb; color: #1f2937; border-radius: 0.375rem; font-weight: 600; transition: background-color 0.2s; }
                .btn-secondary:hover { background-color: #d1d5db; }
                .file-input { margin-top: 0.25rem; display: block; width: 100%; font-size: 0.875rem; color: #6b7280; }
                .file-input::file-selector-button { margin-right: 1rem; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 1rem; padding-right: 1rem; border-radius: 9999px; border: none; font-size: 0.875rem; font-weight: 600; background-color: #eef2ff; color: #4f46e5; cursor: pointer; transition: background-color 0.2s; }
                .file-input::file-selector-button:hover { background-color: #e0e7ff; }
                .dynamic-item-card { position: relative; background-color: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border: 1px solid #e5e7eb; }
                .remove-btn { position: absolute; top: 0.5rem; right: 0.5rem; background-color: #fee2e2; color: #ef4444; border-radius: 9999px; width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold; border: none; cursor: pointer; }
                .remove-btn:hover { background-color: #fca5a5; }
                .skill-tag { display: inline-flex; align-items: center; background-color: #e0e7ff; color: #3730a3; font-size: 0.875rem; font-weight: 500; padding: 0.25rem 0.75rem; border-radius: 9999px; }
                .skill-tag button { margin-left: 0.5rem; background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 1rem; }
            `}</style>
        </div>
    );
};

export default ProfileEdit;