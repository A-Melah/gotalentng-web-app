// src/pages/Profile.jsx
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
            // Background to beige-3, text to blue
            <div className="flex justify-center items-center min-h-screen bg-beige-3 font-poppins">
                <div className="text-blue text-xl font-semibold">Loading Profile...</div>
            </div>
        );
    }

    // --- Render Error State ---
    if (error) {
        return (
            // Background to beige-3, error message background to custom white, text to black
            <div className="flex justify-center items-center min-h-screen bg-beige-3 font-poppins">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-black text-lg">{error}</p>
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
        // Overall background to beige-3, global font to Poppins
        <div className="bg-beige-3 py-12 font-poppins">
            <div className="container mx-auto px-4">
                {/* Main profile card background to custom white */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    {/* --- Header Section --- */}
                    <header className="flex flex-col md:flex-row items-center gap-8 mb-8 border-b pb-8">
                        <img
                            src={basicDetails.photoURL || 'https://placehold.co/150x150/d8cab7/2d3e48?text=No+Photo'}
                            alt="Profile"
                            // Border to beige-2
                            className="w-36 h-36 rounded-full object-cover border-4 border-beige-2"
                        />
                        <div className="text-center md:text-left flex-grow">
                            {/* Name text to green-1, font to Nourd */}
                            <h1 className="text-4xl font-bold text-green-1 font-nourd">{basicDetails.name || 'New User'}</h1>
                            {/* Title/Tagline text to blue */}
                            <p className="text-xl text-blue mt-1">{basicDetails.titleTagline || 'No Title Set'}</p>
                            {/* Location text to green-2 */}
                            <p className="text-md text-green-2 mt-2">{basicDetails.location?.city}, {basicDetails.location?.country}</p>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                {/* Call-to-action buttons */}
                                {/* Message button: bg-blue, text-white, hover:bg-green-1 */}
                                <button className="bg-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-1 transition-colors" title="Functionality not yet implemented">Message</button>
                                {/* Request Interview button: bg-green-3, text-white, hover:bg-green-2 */}
                                <button className="bg-green-3 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-2 transition-colors" title="Functionality not yet implemented">Request Interview</button>
                                {/* Apply to Job button: bg-blue, text-white, hover:bg-green-1 */}
                                <button className="bg-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-1 transition-colors" title="Functionality not yet implemented">Apply to Job</button>
                                {/* Download CV button: bg-green-2, text-white, hover:bg-green-1 */}
                                {cvUpload?.fileURL && <a href={cvUpload.fileURL} target="_blank" rel="noopener noreferrer" className="bg-green-2 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-1 transition-colors">Download CV</a>}
                            </div>
                            <div className="mt-4">
                                {/* Edit Profile link: text-green-1, hover:text-blue */}
                                <Link to="/profile/edit" className="text-sm text-green-1 hover:text-blue hover:underline">Edit My Profile</Link>
                            </div>
                        </div>
                    </header>

                    <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column (Contact, Availability, Metrics) */}
                        <aside className="md:col-span-1 space-y-8">
                            <section>
                                {/* Heading font to Nourd, text to green-1, border-b to beige-2 */}
                                <h2 className="text-xl font-semibold text-green-1 border-b border-beige-2 pb-2 mb-3 font-nourd">Contact</h2>
                                <div className="space-y-2 text-sm">
                                    {/* Text to green-1, links to blue */}
                                    <p className="text-green-1"><strong>Email:</strong> {basicDetails.contact?.email}</p>
                                    <p className="text-green-1"><strong>Phone:</strong> {basicDetails.contact?.phone || 'N/A'}</p>
                                    <p className="text-green-1"><strong>LinkedIn:</strong> <a href={basicDetails.contact?.linkedin} className="text-blue hover:underline">{basicDetails.contact?.linkedin ? 'View Profile' : 'N/A'}</a></p>
                                    <p className="text-green-1"><strong>GitHub:</strong> <a href={basicDetails.contact?.github} className="text-blue hover:underline">{basicDetails.contact?.github ? 'View Profile' : 'N/A'}</a></p>
                                    <p className="text-green-1"><strong>Website:</strong> <a href={basicDetails.contact?.website} className="text-blue hover:underline">{basicDetails.contact?.website ? 'Visit Site' : 'N/A'}</a></p>
                                </div>
                            </section>
                            <section>
                                {/* Heading font to Nourd, text to green-1, border-b to beige-2 */}
                                <h2 className="text-xl font-semibold text-green-1 border-b border-beige-2 pb-2 mb-3 font-nourd">Availability & Rate</h2>
                                {/* Text to green-1, status to green-3 */}
                                <p className="text-green-1"><strong>Status:</strong> <span className="font-bold text-green-3">{availabilityRate?.status || 'Not Set'}</span></p>
                                <p className="text-green-1"><strong>Hourly Rate:</strong> {availabilityRate?.hourlyRate ? `${availabilityRate.hourlyRate} ${availabilityRate.currency}` : 'N/A'}</p>
                                <p className="text-green-1"><strong>Project Rate:</strong> {availabilityRate?.projectRate ? `${availabilityRate.projectRate} ${availabilityRate.currency}`: 'N/A'}</p>
                            </section>
                            <section>
                                {/* Heading font to Nourd, text to green-1, border-b to beige-2 */}
                                <h2 className="text-xl font-semibold text-green-1 border-b border-beige-2 pb-2 mb-3 font-nourd">Metrics</h2>
                                {/* Text to green-1, N/A to green-2 */}
                                <p className="text-green-1"><strong>Profile Views:</strong> {metricsVisibility?.profileViews || 0}</p>
                                <p className="text-green-1"><strong>Last Active:</strong> {formatDate(metricsVisibility?.lastActive)}</p>
                            </section>
                        </aside>

                        {/* Right Column (Main Content) */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                {/* Heading font to Nourd, text to green-1 */}
                                <h2 className="text-2xl font-semibold text-green-1 mb-4 font-nourd">Bio & Skills</h2>
                                {/* Bio text to green-1 */}
                                <p className="text-green-1 whitespace-pre-wrap mb-6">{bioSkills?.bio || 'No bio provided.'}</p>
                                <div className="flex flex-wrap gap-3">
                                    {bioSkills?.skills?.length > 0 ? bioSkills.skills.map(skill => (
                                        // Skill tag background to beige-3, text to blue
                                        <span key={skill} className="bg-beige-3 text-blue text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                    )) : <p className="text-green-2">No skills added yet.</p>}
                                </div>
                            </section>

                            <section>
                                {/* Heading font to Nourd, text to green-1 */}
                                <h2 className="text-2xl font-semibold text-green-1 mb-4 font-nourd">Portfolio</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {portfolio?.length > 0 ? portfolio.map((item, index) => (
                                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                                            {/* Image placeholder to beige-3/green-1 */}
                                            <img src={item.imageURL || 'https://placehold.co/400x300/d8cab7/2d3e48?text=Project'} alt={item.title} className="w-full h-40 object-cover"/>
                                            <div className="p-4">
                                                {/* Project title text to green-1 */}
                                                <h3 className="font-bold text-lg text-green-1">{item.title}</h3>
                                                {/* Description text to green-1 */}
                                                <p className="text-green-1 text-sm mt-1 mb-2">{item.description}</p>
                                                {/* Link text to blue */}
                                                <a href={item.projectLink} className="text-blue hover:underline text-sm font-semibold">View Project</a>
                                            </div>
                                        </div>
                                    )) : <p className="text-green-2 col-span-full">No portfolio projects added yet.</p>}
                                </div>
                            </section>

                            <section>
                                {/* Heading font to Nourd, text to green-1 */}
                                <h2 className="text-2xl font-semibold text-green-1 mb-4 font-nourd">Experience</h2>
                                <div className="space-y-6">
                                    {experience?.length > 0 ? experience.map((exp, index) => (
                                        // Border to beige-2
                                        <div key={index} className="border-l-4 border-beige-2 pl-4">
                                            {/* Title text to green-1 */}
                                            <h3 className="font-bold text-lg text-green-1">{exp.title}</h3>
                                            {/* Company text to green-1 */}
                                            <p className="font-medium text-green-1">{exp.company}</p>
                                            {/* Dates text to green-2 */}
                                            <p className="text-sm text-green-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                            {/* Description text to green-1 */}
                                            <p className="mt-2 text-green-1">{exp.description}</p>
                                        </div>
                                    )) : <p className="text-green-2">No work experience added yet.</p>}
                                </div>
                            </section>

                            <section>
                                {/* Heading font to Nourd, text to green-1 */}
                                <h2 className="text-2xl font-semibold text-green-1 mb-4 font-nourd">Education</h2>
                                <div className="space-y-6">
                                    {education?.length > 0 ? education.map((edu, index) => (
                                        // Border to beige-2
                                        <div key={index} className="border-l-4 border-beige-2 pl-4">
                                            {/* Degree text to green-1 */}
                                            <h3 className="font-bold text-lg text-green-1">{edu.degree}</h3>
                                            {/* School text to green-1 */}
                                            <p className="font-medium text-green-1">{edu.school}</p>
                                            {/* Dates text to green-2 */}
                                            <p className="text-sm text-green-2">{edu.startDate} - {edu.endDate}</p>
                                        </div>
                                    )) : <p className="text-green-2">No education history added yet.</p>}
                                </div>
                            </section>

                            <section>
                                {/* Heading font to Nourd, text to green-1 */}
                                <h2 className="text-2xl font-semibold text-green-1 mb-4 font-nourd">Reviews & Ratings</h2>
                                {/* Background to beige-3 */}
                                <div className="bg-beige-3 p-4 rounded-lg">
                                    {/* Text to green-1 */}
                                    <p className="text-green-1"><strong>Average Rating:</strong> {reviewsRatings?.averageRating?.toFixed(1) || 'N/A'} / 5</p>
                                    {/* Text to green-2 */}
                                    <p className="text-green-2 mt-2">{reviewsRatings?.excerpts?.length > 0 ? 'No reviews yet.' : ''}</p>
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
