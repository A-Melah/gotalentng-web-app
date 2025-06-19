import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section id="hero-home" className="bg-indigo-700 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Unlock Exceptional Talent & Careers
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
                        GoTalent NG empowers individuals to achieve their career aspirations and enables businesses to build high-performing teams.
                    </p>
                    <Link to="/services" className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300 ease-in-out shadow-lg">
                        Explore Our Services
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Your Partner in Growth and Opportunity</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        At GoTalent NG, we bridge the gap between ambitious individuals seeking their next big career move and forward-thinking businesses in Tech, FinTech, and Manufacturing looking for top-tier talent. Our comprehensive solutions are designed to foster growth, drive innovation, and ensure lasting success.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        From expert recruitment and strategic project delivery to personalized career development and cutting-edge training programs, we are committed to empowering both people and organizations to reach their full potential.
                    </p>
                </div>
            </section>

            {/* Key Offerings Highlights */}
            <section className="py-16 px-4 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Talent Solutions */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            <div className="text-indigo-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.146-1.285-.413-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.146-1.285.413-1.857m0 0a5.002 5.002 0 019.174 0M13 16h.01M12 11V9m0 3v2m0 6h.01"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Talent Solutions</h3>
                            <p className="text-gray-700 mb-4">
                                Connect with top-tier professionals quickly and efficiently. From executive search to contract staffing, we find the perfect fit for your team.
                            </p>
                            <Link to="/talent-request" className="text-indigo-600 hover:text-indigo-800 font-medium">Request Talent &rarr;</Link>
                        </div>

                        {/* Career Development */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            <div className="text-emerald-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">Career Development</h3>
                            <p className="text-gray-700 mb-4">
                                Empowering individuals with personalized coaching, CV optimization, interview prep, and job search strategies.
                            </p>
                            <Link to="/services" className="text-emerald-600 hover:text-emerald-800 font-medium">Learn More &rarr;</Link>
                        </div>

                        {/* Training & Upskilling */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            <div className="text-purple-600 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-purple-700 mb-3">Training & Upskilling</h3>
                            <p className="text-gray-700 mb-4">
                                Equip your teams with the latest skills through technical bootcamps and leadership workshops tailored to your needs.
                            </p>
                            <Link to="/training" className="text-purple-600 hover:text-purple-800 font-medium">Register for Training &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-indigo-600 text-white py-16 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business or Career?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Whether you're a business seeking exceptional talent or an individual aiming for career breakthrough, GoTalent NG is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/contact" className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300 ease-in-out shadow-lg">
                            Contact Us Today
                        </Link>
                        <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-700 transition duration-300 ease-in-out shadow-lg">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
