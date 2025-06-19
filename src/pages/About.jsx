import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page py-16 px-4 bg-white">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">About GoTalent NG</h1>

                {/* Section: Who We Are */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Who We Are</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                GoTalent NG is a leading human capital solutions provider dedicated to bridging the gap between exceptional talent and businesses poised for growth. We operate at the intersection of innovation and human potential, supporting companies across dynamic sectors like **Tech, FinTech, and Manufacturing.**
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our dual focus empowers both organizations and individuals. We equip businesses with the high-performing teams they need for critical project delivery, sustained growth, and digital transformation. Simultaneously, we empower individuals to navigate their career paths with confidence, providing the tools and training necessary to unlock their full potential and achieve their professional aspirations.
                            </p>
                        </div>
                        <div className="md:order-1">
                            {/* Placeholder image for illustration */}
                            <img src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="GoTalent NG Team" className="rounded-lg shadow-xl" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/93C5FD/1E3A8A?text=GoTalent+NG"; }} />
                        </div>
                    </div>
                </section>

                {/* Section: Vision & Mission */}
                <section className="mb-16 bg-indigo-50 p-8 rounded-lg shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Our Vision</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To be the trusted partner of choice for businesses and individuals—delivering transformative talent solutions and personalized career growth that unlock potential, spark innovation, and drive lasting success in an ever-evolving world. We envision a future where talent meets opportunity seamlessly, fostering a global ecosystem of thriving careers and innovative enterprises.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At GoTalent, our mission is to empower individuals to achieve their career aspirations and enable businesses to build high-performing teams through expert recruitment, personalized career development, dynamic training programs, and strategic business advisory. We are committed to making a measurable impact on every client and candidate we serve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Core Values */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
                        {[
                            "INTEGRITY: Upholding honesty and ethical standards in all interactions.",
                            "EXCELLENCE: Striving for the highest quality in every service we deliver.",
                            "EMPOWERMENT: Enabling individuals and organizations to achieve their full potential.",
                            "INNOVATION: Embracing new ideas and creative solutions for evolving challenges.",
                            "COLLABORATION: Fostering strong partnerships and teamwork.",
                            "PEOPLE CENTRIC: Prioritizing the needs and success of our clients and candidates.",
                            "DIVERSITY/INCLUSION: Valuing varied perspectives and creating equitable opportunities."
                        ].map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-b-4 border-indigo-500 hover:shadow-xl transition duration-300">
                                <h3 className="font-semibold text-xl text-gray-800 mb-2">{value.split(':')[0]}</h3>
                                <p className="text-gray-600 text-sm">{value.split(':')[1]}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Our Approach */}
                <section className="mb-16 bg-gray-100 p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Our Unique Approach</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 3.072 1.887 5.863 4.71 7.411L12 22.055l4.37-2.524A12.001 12.001 0 0021.08 12c0-3.072-1.887-5.863-4.71-7.411z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultative Engagement</h3>
                                <p className="text-gray-700">
                                    We start by deeply listening, understanding, and comprehensively assessing both client and individual needs. This ensures our solutions are not just effective, but perfectly tailored to achieve specific objectives.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Outcome-Driven Process</h3>
                                <p className="text-gray-700">
                                    Every service we offer is meticulously designed around achieving tangible, measurable goals. Whether it's securing a dream job, efficiently filling a critical role, or flawlessly executing a complex project, we focus on results.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Matching</h3>
                                <p className="text-gray-700">
                                    Leveraging our deep industry networks and advanced sourcing strategies, we excel at connecting businesses with precisely the right top-tier professionals who can make an immediate impact.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Support</h3>
                                <p className="text-gray-700">
                                    From the initial resume building to post-placement coaching, we provide continuous, hands-on support. We walk alongside our clients throughout their entire journey, ensuring sustained success.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to action to services */}
                <section className="text-center py-8">
                    <p className="text-xl text-gray-800 mb-6">Discover how our expertise can drive your success.</p>
                    <Link to="/services" className="bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg">
                        View All Services
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default About;
