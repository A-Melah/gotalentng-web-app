import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

// --- Helper function to format date ---
const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};


// --- Profile Page Component ---
// This component displays the user's profile information.
// If it detects a new user (no profile document), it redirects to the edit page.
const Profile = ({ currentUser, db }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Redirect to login if user is not authenticated
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const userProfileRef = doc(db, "userProfiles", currentUser.uid);
        setIsLoading(true);

        const fetchProfile = async () => {
            try {
                const docSnap = await getDoc(userProfileRef);

                if (docSnap.exists() && docSnap.data().basicDetails?.name) {
    // If the profile exists AND has a name, display it
    setProfileData(docSnap.data());
} else {
    // Otherwise (if it doesn't exist or has no name), it's a new user
    // Redirect to the edit page.
    navigate('/profile/edit');
}
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser, db, navigate]);

    // --- Render Loading State ---
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-indigo-700 text-xl font-semibold">Loading Profile...</div>
            </div>
        );
    }

    // --- Render Error State ---
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    // This part will only render if a profile was found and loaded
    if (!profileData) {
        // This state is temporary while redirecting, so we show nothing.
        return null; 
    }

    // Destructure for easier access
    const { 
        basicDetails, bioSkills, experience, education, portfolio,
        cvUpload, reviewsRatings, availabilityRate, metricsVisibility 
    } = profileData;

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    {/* --- Header Section --- */}
                    <header className="flex flex-col md:flex-row items-center gap-8 mb-8 border-b pb-8">
                        <img 
                            src={basicDetails.photoURL || 'https://placehold.co/150x150/E2E8F0/4A5568?text=No+Photo'} 
                            alt="Profile" 
                            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-200"
                        />
                        <div className="text-center md:text-left flex-grow">
                            <h1 className="text-4xl font-bold text-gray-800">{basicDetails.name || 'New User'}</h1>
                            <p className="text-xl text-indigo-600 mt-1">{basicDetails.titleTagline || 'No Title Set'}</p>
                            <p className="text-md text-gray-500 mt-2">{basicDetails.location?.city}, {basicDetails.location?.country}</p>
                             <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                {/* Call-to-action buttons */}
                                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors" title="Functionality not yet implemented">Message</button>
                                <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors" title="Functionality not yet implemented">Request Interview</button>
                                <button className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors" title="Functionality not yet implemented">Apply to Job</button>
                                {cvUpload?.fileURL && <a href={cvUpload.fileURL} target="_blank" rel="noopener noreferrer" className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">Download CV</a>}
                            </div>
                             <div className="mt-4">
                                <Link to="/profile/edit" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline">Edit My Profile</Link>
                             </div>
                        </div>
                    </header>

                    <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column (Contact, Availability, Metrics) */}
                        <aside className="md:col-span-1 space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">Contact</h2>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Email:</strong> {basicDetails.contact?.email}</p>
                                    <p><strong>Phone:</strong> {basicDetails.contact?.phone || 'N/A'}</p>
                                    <p><strong>LinkedIn:</strong> <a href={basicDetails.contact?.linkedin} className="text-indigo-600 hover:underline">{basicDetails.contact?.linkedin ? 'View Profile' : 'N/A'}</a></p>
                                    <p><strong>GitHub:</strong> <a href={basicDetails.contact?.github} className="text-indigo-600 hover:underline">{basicDetails.contact?.github ? 'View Profile' : 'N/A'}</a></p>
                                    <p><strong>Website:</strong> <a href={basicDetails.contact?.website} className="text-indigo-600 hover:underline">{basicDetails.contact?.website ? 'Visit Site' : 'N/A'}</a></p>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">Availability & Rate</h2>
                                <p><strong>Status:</strong> <span className="font-bold text-green-600">{availabilityRate?.status || 'Not Set'}</span></p>
                                <p><strong>Hourly Rate:</strong> {availabilityRate?.hourlyRate ? `${availabilityRate.hourlyRate} ${availabilityRate.currency}` : 'N/A'}</p>
                                <p><strong>Project Rate:</strong> {availabilityRate?.projectRate ? `${availabilityRate.projectRate} ${availabilityRate.currency}`: 'N/A'}</p>
                            </section>
                             <section>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">Metrics</h2>
                                <p><strong>Profile Views:</strong> {metricsVisibility?.profileViews || 0}</p>
                                <p><strong>Last Active:</strong> {formatDate(metricsVisibility?.lastActive)}</p>
                            </section>
                        </aside>

                        {/* Right Column (Main Content) */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bio & Skills</h2>
                                <p className="text-gray-600 whitespace-pre-wrap mb-6">{bioSkills?.bio || 'No bio provided.'}</p>
                                <div className="flex flex-wrap gap-3">
                                    {bioSkills?.skills?.length > 0 ? bioSkills.skills.map(skill => (
                                        <span key={skill} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                    )) : <p className="text-gray-500">No skills added yet.</p>}
                                </div>
                            </section>
                            
                             <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     {portfolio?.length > 0 ? portfolio.map((item, index) => (
                                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                                            <img src={item.imageURL || 'https://placehold.co/400x300/E2E8F0/4A5568?text=Project'} alt={item.title} className="w-full h-40 object-cover"/>
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg">{item.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1 mb-2">{item.description}</p>
                                                <a href={item.projectLink} className="text-indigo-600 hover:underline text-sm font-semibold">View Project</a>
                                            </div>
                                        </div>
                                     )) : <p className="text-gray-500 col-span-full">No portfolio projects added yet.</p>}
                                </div>
                            </section>

                            <section>
                                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h2>
                                 <div className="space-y-6">
                                    {experience?.length > 0 ? experience.map((exp, index) => (
                                        <div key={index} className="border-l-4 border-indigo-200 pl-4">
                                            <h3 className="font-bold text-lg text-gray-700">{exp.title}</h3>
                                            <p className="font-medium text-gray-600">{exp.company}</p>
                                            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                            <p className="mt-2 text-gray-600">{exp.description}</p>
                                        </div>
                                    )) : <p className="text-gray-500">No work experience added yet.</p>}
                                 </div>
                            </section>

                             <section>
                                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
                                 <div className="space-y-6">
                                    {education?.length > 0 ? education.map((edu, index) => (
                                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                                            <h3 className="font-bold text-lg text-gray-700">{edu.degree}</h3>
                                            <p className="font-medium text-gray-600">{edu.school}</p>
                                            <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                        </div>
                                    )) : <p className="text-gray-500">No education history added yet.</p>}
                                 </div>
                            </section>

                            <section>
                                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews & Ratings</h2>
                                 <div className="bg-gray-100 p-4 rounded-lg">
                                    <p><strong>Average Rating:</strong> {reviewsRatings?.averageRating?.toFixed(1) || 'N/A'} / 5</p>
                                    <p className="text-gray-500 mt-2">{reviewsRatings?.excerpts?.length > 0 ? 'No reviews yet.' : ''}</p>
                                 </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;
