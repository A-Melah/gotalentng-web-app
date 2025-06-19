import React from 'react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
    return (
        <div className="why-choose-us-page py-16 px-4 bg-indigo-700 text-white">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-12">Why Choose GoTalent NG?</h1>
                <p className="text-lg mb-16 max-w-3xl mx-auto">
                    Choosing the right partner for talent and career growth is critical. At GoTalent NG, we stand out through our commitment to your success, deep industry understanding, and a truly human-centric approach.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Reason 1 */}
                    <div className="bg-indigo-600 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                        <div className="text-white mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Human-First Approach</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            We believe in the power of human connection. Our strategies prioritize the well-being and success of both our clients and the candidates we place, ensuring a mutually beneficial partnership built on trust and respect.
                        </p>
                    </div>

                    {/* Reason 2 */}
                    <div className="bg-indigo-600 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                        <div className="text-white mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.25A2.25 2.25 0 0012.75 3h-1.5A2.25 2.25 0 009 5.25V10M15 10h3.25c.706 0 1.28.606 1.28 1.35V16c0 .744-.574 1.35-1.28 1.35H9.75m0-7.35V17m0 0a2 2 0 002 2h4a2 2 0 002-2m-6 0H9.75"></path></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Industry Expertise</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            The tech and talent landscapes are constantly evolving. We stay ahead of the curve, possessing deep insights into market trends, emerging technologies, and critical skill demands across Tech, FinTech, and Manufacturing.
                        </p>
                    </div>

                    {/* Reason 3 */}
                    <div className="bg-indigo-600 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                        <div className="text-white mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h.01M12 16L9 12h.01M12 16L15 12h.01"></path></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Career Builders & Business Enablers</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            We're more than just recruiters. For individuals, we're dedicated career builders, and for businesses, we act as strategic enablers, providing the human capital necessary to achieve ambitious goals and drive innovation.
                        </p>
                    </div>

                    {/* Reason 4 */}
                    <div className="bg-indigo-600 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                        <div className="text-white mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V3m0 18v-7.5M21 10h-5.46M3 10h5.46m12-3.81L16 10l-4.71-3.81M12 16l4.71 3.81L21 16"></path></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">End-to-End Support</h3>
                        <p className="text-indigo-100 leading-relaxed">
                            Our commitment doesn't end with a placement. We offer continuous, comprehensive support—from guiding career breakthroughs to facilitating complete business transformations. We are with you every step of the way.
                        </p>
                    </div>
                </div>

                {/* Testimonial Section (Mock) */}
                <section className="mt-20">
                    <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-indigo-500 p-8 rounded-lg shadow-md">
                            <p className="text-lg italic mb-6">
                                "GoTalent NG revolutionized our hiring process. Their understanding of our needs in the FinTech space was unparalleled, and they delivered top talent swiftly. Highly recommended!"
                            </p>
                            <p className="font-semibold text-right">- CEO, Leading FinTech Startup</p>
                        </div>
                        <div className="bg-indigo-500 p-8 rounded-lg shadow-md">
                            <p className="text-lg italic mb-6">
                                "Thanks to GoTalent, I landed my dream role in a multinational tech firm. Their career coaching and interview prep were invaluable. They truly care about individual success."
                            </p>
                            <p className="font-semibold text-right">- Senior Software Engineer</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="mt-16 text-center">
                    <p className="text-xl mb-8">Ready to experience the GoTalent difference?</p>
                    <Link to="/contact" className="bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300 ease-in-out shadow-lg">
                        Connect with Us
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default WhyChooseUs;
