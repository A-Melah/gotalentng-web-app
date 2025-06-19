import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const Services = () => {
    const location = useLocation(); // Get the current location object

    // Effect to scroll to the relevant section when the hash changes
    useEffect(() => {
        // If there's a hash in the URL (e.g., #business-advisory)
        if (location.hash) {
            // Get the element ID from the hash (remove the leading #)
            const elementId = location.hash.substring(1);
            const element = document.getElementById(elementId);

            if (element) {
                // Approximate height of your fixed header.
                // Increased to 96px (6rem) for more clearance. Adjust if header changes.
                const headerOffset = 96; 

                // Calculate the target scroll position: element's top position + current scroll position - header offset
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                // Scroll to that adjusted position smoothly
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // If no hash, scroll to the top of the page (optional, but good for consistency)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]); // Re-run effect whenever the location (especially hash) changes

    return (
        <div className="services-page py-16 px-4 bg-gray-50">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Our Comprehensive Services</h1>
                <p className="text-lg text-gray-700 text-center mb-16 max-w-3xl mx-auto">
                    GoTalent NG offers a diverse range of services designed to meet the evolving needs of businesses and individuals in today's dynamic market. From strategic advisory to talent placement and skill development, we are your partner in growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Service 1: Business Advisory */}
                    {/* Added id="business-advisory" */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-indigo-500" id="business-advisory">
                        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">1. Business Advisory</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We help organizations align people, processes, and strategy for sustainable growth and resilience in competitive landscapes. Our advisory services provide the insights needed to make informed decisions.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li>Workforce planning and optimization</li>
                            <li>Talent strategy and organizational design</li>
                            <li>HR and recruitment process consulting</li>
                            <li>Scaling advisory for startups and growing teams</li>
                        </ul>
                        <Link to="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium">Get Advisory &rarr;</Link>
                    </div>

                    {/* Service 2: Project Management */}
                    {/* Added id="project-management" */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-emerald-500" id="project-management">
                        <h3 className="text-2xl font-semibold text-emerald-700 mb-4">2. Project Management</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            From initial concept to flawless execution, we manage and deliver complex projects that drive significant business impact. We ensure quality, timeliness, and innovation at every stage.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li>Tech & Digital Transformation Projects</li>
                            <li>End-to-End Project Delivery & Support</li>
                            <li>Cross-functional Team Management</li>
                            <li>Quality Assurance & Milestone Reporting</li>
                        </ul>
                        <Link to="/contact" className="text-emerald-600 hover:text-emerald-800 font-medium">Discuss Your Project &rarr;</Link>
                    </div>

                    {/* Service 3: Talent-as-a-Service */}
                    {/* Added id="talent-as-a-service" */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-purple-500" id="talent-as-a-service">
                        <h3 className="text-2xl font-semibold text-purple-700 mb-4">3. Talent-as-a-Service</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Gain immediate access to top-tier talent, exactly when and where you need it. Our flexible staffing solutions are tailored to integrate seamlessly with your operations.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li>End-to-End Recruitment (Tech, FinTech, Manufacturing)</li>
                            <li>Executive Search & Headhunting</li>
                            <li>Contract & Remote Staffing Solutions</li>
                            <li>Talent Pipeline Building, Offer Negotiation & Onboarding Support</li>
                        </ul>
                        <Link to="/talent-request" className="text-purple-600 hover:text-purple-800 font-medium">Request Talent &rarr;</Link>
                    </div>

                    {/* Service 4: Career Development */}
                    {/* Added id="career-development" */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-rose-500" id="career-development">
                        <h3 className="text-2xl font-semibold text-rose-700 mb-4">4. Career Development</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We empower individuals to take ownership of their career path, stand out in a competitive job market, and achieve lasting success through expert guidance.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                            <li>CV & Cover Letter Optimization</li>
                            <li>LinkedIn Profile Revamp</li>
                            <li>Job Search Strategies & Market Positioning</li>
                            <li>Interview Preparation & Mock Interviews</li>
                            <li>Career Coaching Goal Setting</li>
                        </ul>
                        <Link to="/contact" className="text-rose-600 hover:text-rose-800 font-medium">Boost Your Career &rarr;</Link>
                    </div>

                    {/* Service 5: Training & Development */}
                    {/* Added id="training-development" */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-sky-500" id="training-development">
                        <h3 className="text-2xl font-semibold text-sky-700 mb-4">5. Training & Development</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Equip your teams and individuals with the essential skills to lead, adapt, and thrive in an ever-evolving professional landscape. Our programs are practical and impactful.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                            <li>Staff Training & Upskilling Programs</li>
                            <li>Technical Bootcamps (Cloud, DevOps, Cybersecurity, etc.)</li>
                            <li>Soft Skills & Leadership Workshops</li>
                            <li>Custom Learning Paths for Teams</li>
                        </ul>
                        {/* Brochure Download Button */}
                        <a href="https://www.africau.edu/images/default/sample.pdf" download="GoTalent_Training_Brochure.pdf" className="inline-block bg-indigo-700 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg">
                            Download Training Brochure & Fees
                        </a>
                        <Link to="/training" className="block text-center mt-4 text-sky-600 hover:text-sky-800 font-medium">Register for Training &rarr;</Link>
                    </div>

                    {/* Who We Serve Section - Integrated into Services overview */}
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out border-t-4 border-gray-400">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who We Serve</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our services are tailored for a diverse clientele, ensuring targeted solutions that deliver real value.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Tech Startups & Scaleups looking for agile talent solutions.</li>
                            <li>FinTech Companies navigating rapid industry changes.</li>
                            <li>Individuals in Tech, Business, and Engineering seeking career advancement.</li>
                            <li>Organizations needing specialized Training, Reskilling, or strategic Advisory Services.</li>
                        </ul>
                        <Link to="/about" className="text-gray-600 hover:text-gray-800 font-medium block text-center mt-4">Learn More About Who We Help &rarr;</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Services;
