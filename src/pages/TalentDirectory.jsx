import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const TalentDirectory = () => {
    const [talents, setTalents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTalents = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'public_profiles'));
                const talentList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTalents(talentList);
                console.log('Fetched public profiles:', talentList);
            } catch (error) {
                console.error('Error fetching talents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTalents();
    }, []);

    // Filter talents based on the search term
    const filteredTalents = talents.filter(talent => {
        const skillsMatch = talent.skills?.some(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const headlineMatch = talent.headline?.toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = talent.displayName?.toLowerCase().includes(searchTerm.toLowerCase());

        return skillsMatch || headlineMatch || nameMatch;
    });

    if (loading) {
        // Loading text color to blue, font to Poppins
        return <div className="flex justify-center items-center min-h-screen text-blue font-poppins">Loading talents...</div>;
    }

    return (
        // Apply Poppins globally to the page, background to beige-3
        <div className="container mx-auto px-4 py-8 bg-beige-3 font-poppins">
            {/* Main heading font to Nourd, text to blue */}
            <h1 className="text-4xl font-bold text-center text-blue mb-8 font-nourd">Discover Top Talents</h1>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by skill (e.g., DevOps, React, Cybersecurity)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // Input border to beige-2, placeholder to beige-1, focus ring to blue
                    className="w-full p-4 border border-beige-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue transition-all text-green-1 placeholder-beige-1"
                />
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTalents.length > 0 ? (
                    filteredTalents.map(talent => (
                        // Card background to custom white, shadow remains
                        <div key={talent.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            {/* Profile Photo */}
                            <img
                                src={talent.photoURL || 'https://placehold.co/150x150/d8cab7/2d3e48?text=No+Photo'} // Use a placeholder if no photo
                                alt={`${talent.displayName}'s photo`}
                                // Border to beige-2
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-beige-2"
                            />

                            {/* Basic Details */}
                            {/* Name text to green-1, font to Nourd */}
                            <h2 className="text-xl font-semibold text-green-1 font-nourd">{talent.displayName}</h2>
                            {/* Headline text to blue */}
                            <p className="text-blue font-medium mb-2">{talent.headline || 'Talent'}</p>
                            {/* Location text to green-2 */}
                            <p className="text-green-2 text-sm mb-4">{talent.location || 'Location not specified'}</p>

                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {talent.skills?.map((skill, index) => (
                                    // Skill tag background to beige-3, text to blue
                                    <span key={index} className="bg-beige-3 text-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Bio */}
                            {/* Bio text to green-1 */}
                            <p className="text-green-1 text-sm italic mb-4 line-clamp-3">{talent.bio}</p>

                            {/* Request Button */}
                            <Link
                                to={`/talent-request?talentId=${talent.id}`}
                                // Button background to blue, text to custom white, hover background to green-1
                                className="inline-block bg-blue text-white font-bold py-2 px-6 rounded-full hover:bg-green-1 transition duration-300"
                            >
                                Request Talent
                            </Link>
                        </div>
                    ))
                ) : (
                    // No talents found text to green-2
                    <div className="col-span-full text-center text-green-2 py-10">
                        No talents found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TalentDirectory;
