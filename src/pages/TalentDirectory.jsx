// src/pages/TalentDirectory.jsx
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
        return <div className="flex justify-center items-center min-h-screen">Loading talents...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Discover Top Talents</h1>
            
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by skill (e.g., DevOps, React, Cybersecurity)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTalents.length > 0 ? (
                    filteredTalents.map(talent => (
                        <div key={talent.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            {/* Profile Photo */}
                            <img
                                src={talent.photoURL || 'https://via.placeholder.com/150'} // Use a placeholder if no photo
                                alt={`${talent.displayName}'s photo`}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-200"
                            />
                            
                            {/* Basic Details */}
                            <h2 className="text-xl font-semibold text-gray-900">{talent.displayName}</h2>
                            <p className="text-indigo-600 font-medium mb-2">{talent.headline || 'Talent'}</p>
                            <p className="text-gray-500 text-sm mb-4">{talent.location || 'Location not specified'}</p>
                            
                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {talent.skills?.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Bio */}
                            <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">{talent.bio}</p>

                            {/* Request Button */}
                            <Link 
                                to={`/talent-request?talentId=${talent.id}`}
                                className="inline-block bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
                            >
                                Request Talent
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-10">
                        No talents found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TalentDirectory;