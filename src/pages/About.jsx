import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        // Main page background changed to custom white and font-poppins for overall consistency
        <div className="about-page py-16 px-4 bg-white font-poppins">
            <div className="container mx-auto">
                {/* Main heading text color changed to green-1 (darkest green) and font-nourd */}
                <h1 className="text-4xl md:text-5xl font-bold text-center text-green-1 mb-12 font-nourd">About GoTalent NG</h1>

                {/* Section: Who We Are */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2">
                            {/* Section heading text color changed to blue and font-nourd */}
                            <h2 className="text-3xl font-semibold text-blue mb-6 font-nourd">Who We Are</h2>
                            {/* Body text color changed to green-1 and font-poppins */}
                            <p className="text-lg text-green-1 leading-relaxed mb-4 font-poppins">
                                GoTalent NG is a leading human capital solutions provider dedicated to bridging the gap between exceptional talent and businesses poised for growth. We operate at the intersection of innovation and human potential, supporting companies across dynamic sectors like **Tech, FinTech, and Manufacturing.**
                            </p>
                            <p className="text-lg text-green-1 leading-relaxed font-poppins">
                                Our dual focus empowers both organizations and individuals. We equip businesses with the high-performing teams they need for critical project delivery, sustained growth, and digital transformation. Simultaneously, we empower individuals to navigate their career paths with confidence, providing the tools and training necessary to unlock their full potential and achieve their professional aspirations.
                            </p>
                        </div>
                        <div className="md:order-1">
                            {/* Placeholder image for illustration */}
                            <img src="src/assets/mockup wall.png" alt="GoTalent NG Team" className="rounded-lg shadow-xl" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/154270/f0f0f0?text=GoTalent+NG"; }} />
                        </div>
                    </div>
                </section>

                {/* Section: Vision & Mission */}
                {/* Background changed to beige-3, shadow-inner remains */}
                <section className="mb-16 bg-beige-3 p-8 rounded-lg shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            {/* Section heading text color changed to blue and font-nourd */}
                            <h2 className="text-3xl font-semibold text-blue mb-6 font-nourd">Our Vision</h2>
                            {/* Body text color changed to green-1 and font-poppins */}
                            <p className="text-lg text-green-1 leading-relaxed font-poppins">
                                To be the trusted partner of choice for businesses and individuals—delivering transformative talent solutions and personalized career growth that unlock potential, spark innovation, and drive lasting success in an ever-evolving world. We envision a future where talent meets opportunity seamlessly, fostering a global ecosystem of thriving careers and innovative enterprises.
                            </p>
                        </div>
                        <div>
                            {/* Section heading text color changed to blue and font-nourd */}
                            <h2 className="text-3xl font-semibold text-blue mb-6 font-nourd">Our Mission</h2>
                            {/* Body text color changed to green-1 and font-poppins */}
                            <p className="text-lg text-green-1 leading-relaxed font-poppins">
                                At GoTalent, our mission is to empower individuals to achieve their career aspirations and enable businesses to build high-performing teams through expert recruitment, personalized career development, dynamic training programs, and strategic business advisory. We are committed to making a measurable impact on every client and candidate we serve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Core Values */}
                <section className="mb-16">
                    {/* Section heading text color changed to green-1 and font-nourd */}
                    <h2 className="text-3xl font-semibold text-center text-green-1 mb-8 font-nourd">Our Core Values</h2>
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
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-b-4 border-blue hover:shadow-xl transition duration-300">
                                {/* Card title text color changed to green-1 and font-poppins */}
                                <h3 className="font-semibold text-xl text-green-1 mb-2 font-poppins">{value.split(':')[0]}</h3>
                                {/* Card description text color changed to green-2 and font-poppins */}
                                <p className="text-green-2 text-sm font-poppins">{value.split(':')[1]}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Our Approach */}
                {/* Background changed to beige-3, shadow-md remains */}
                <section className="mb-16 bg-beige-3 p-8 rounded-lg shadow-md">
                    {/* Section heading text color changed to green-1 and font-nourd */}
                    <h2 className="text-3xl font-semibold text-center text-green-1 mb-8 font-nourd">Our Unique Approach</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-start space-x-4">
                            {/* SVG icon color changed to blue */}
                            <div className="flex-shrink-0 text-blue">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 3.072 1.887 5.863 4.71 7.411L12 22.055l4.37-2.524A12.001 12.001 0 0021.08 12c0-3.072-1.887-5.863-4.71-7.411z"></path></svg>
                            </div>
                            <div>
                                {/* Approach title text color changed to green-1 and font-nourd */}
                                <h3 className="text-xl font-semibold text-green-1 mb-2 font-nourd">Consultative Engagement</h3>
                                {/* Approach description text color changed to green-1 and font-poppins */}
                                <p className="text-green-1 font-poppins">
                                    We start by deeply listening, understanding, and comprehensively assessing both client and individual needs. This ensures our solutions are not just effective, but perfectly tailored to achieve specific objectives.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            {/* SVG icon color changed to blue */}
                            <div className="flex-shrink-0 text-blue">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            </div>
                            <div>
                                {/* Approach title text color changed to green-1 and font-nourd */}
                                <h3 className="text-xl font-semibold text-green-1 mb-2 font-nourd">Outcome-Driven Process</h3>
                                {/* Approach description text color changed to green-1 and font-poppins */}
                                <p className="text-green-1 font-poppins">
                                    Every service we offer is meticulously designed around achieving tangible, measurable goals. Whether it's securing a dream job, efficiently filling a critical role, or flawlessly executing a complex project, we focus on results.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            {/* SVG icon color changed to blue */}
                            <div className="flex-shrink-0 text-blue">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                {/* Approach title text color changed to green-1 and font-nourd */}
                                <h3 className="text-xl font-semibold text-green-1 mb-2 font-nourd">Expert Matching</h3>
                                {/* Approach description text color changed to green-1 and font-poppins */}
                                <p className="text-green-1 font-poppins">
                                    Leveraging our deep industry networks and advanced sourcing strategies, we excel at connecting businesses with precisely the right top-tier professionals who can make an immediate impact.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            {/* SVG icon color changed to blue */}
                            <div className="flex-shrink-0 text-blue">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <div>
                                {/* Approach title text color changed to green-1 and font-nourd */}
                                <h3 className="text-xl font-semibold text-green-1 mb-2 font-nourd">Hands-On Support</h3>
                                {/* Approach description text color changed to green-1 and font-poppins */}
                                <p className="text-green-1 font-poppins">
                                    From the initial resume building to post-placement coaching, we provide continuous, hands-on support. We walk alongside our clients throughout their entire journey, ensuring sustained success.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Merged Section: Why Choose GoTalent NG? --- */}
                {/* Background to blue, text to custom white */}
                <section className="py-16 px-4 bg-blue text-white font-poppins">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-nourd">Why Choose GoTalent NG?</h2>
                    <p className="text-lg mb-16 max-w-3xl mx-auto text-white">
                        Choosing the right partner for talent and career growth is critical. At GoTalent NG, we stand out through our commitment to your success, deep industry understanding, and a truly human-centric approach.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Reason 1 */}
                        {/* Card background to green-1, shadow and hover shadow remain */}
                        <div className="bg-green-1 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                            {/* SVG icon color to custom white */}
                            <div className="text-white mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            {/* Title font to Nourd, text to custom white */}
                            <h3 className="text-2xl font-semibold mb-3 font-nourd text-white">Human-First Approach</h3>
                            {/* Paragraph text to beige-3 */}
                            <p className="text-beige-3 leading-relaxed">
                                We believe in the power of human connection. Our strategies prioritize the well-being and success of both our clients and the candidates we place, ensuring a mutually beneficial partnership built on trust and respect.
                            </p>
                        </div>

                        {/* Reason 2 */}
                        {/* Card background to green-1, shadow and hover shadow remain */}
                        <div className="bg-green-1 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                            {/* SVG icon color to custom white */}
                            <div className="text-white mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5.25A2.25 2.25 0 0012.75 3h-1.5A2.25 2.25 0 009 5.25V10M15 10h3.25c.706 0 1.28.606 1.28 1.35V16c0 .744-.574 1.35-1.28 1.35H9.75m0-7.35V17m0 0a2 2 0 002 2h4a2 2 0 002-2m-6 0H9.75"></path></svg>
                            </div>
                            {/* Title font to Nourd, text to custom white */}
                            <h3 className="text-2xl font-semibold mb-3 font-nourd text-white">Industry Expertise</h3>
                            {/* Paragraph text to beige-3 */}
                            <p className="text-beige-3 leading-relaxed">
                                The tech and talent landscapes are constantly evolving. We stay ahead of the curve, possessing deep insights into market trends, emerging technologies, and critical skill demands across Tech, FinTech, and Manufacturing.
                            </p>
                        </div>

                        {/* Reason 3 */}
                        {/* Card background to green-1, shadow and hover shadow remain */}
                        <div className="bg-green-1 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                            {/* SVG icon color to custom white */}
                            <div className="text-white mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h.01M12 16L9 12h.01M12 16L15 12h.01"></path></svg>
                            </div>
                            {/* Title font to Nourd, text to custom white */}
                            <h3 className="text-2xl font-semibold mb-3 font-nourd text-white">Career Builders & Business Enablers</h3>
                            {/* Paragraph text to beige-3 */}
                            <p className="text-beige-3 leading-relaxed">
                                We're more than just recruiters. For individuals, we're dedicated career builders, and for businesses, we act as strategic enablers, providing the human capital necessary to achieve ambitious goals and drive innovation.
                            </p>
                        </div>

                        {/* Reason 4 */}
                        {/* Card background to green-1, shadow and hover shadow remain */}
                        <div className="bg-green-1 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                            {/* SVG icon color to custom white */}
                            <div className="text-white mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V3m0 18v-7.5M21 10h-5.46M3 10h5.46m12-3.81L16 10l-4.71-3.81M12 16l4.71 3.81L21 16"></path></svg>
                            </div>
                            {/* Title font to Nourd, text to custom white */}
                            <h3 className="text-2xl font-semibold mb-3 font-nourd text-white">End-to-End Support</h3>
                            {/* Paragraph text to beige-3 */}
                            <p className="text-beige-3 leading-relaxed">
                                Our commitment doesn't end with a placement. We offer continuous, comprehensive support—from guiding career breakthroughs to facilitating complete business transformations. We are with you every step of the way.
                            </p>
                        </div>
                    </div>

                    {/* Testimonial Section (Mock) */}
                    <section className="mt-20">
                        {/* Heading font to Nourd, text to custom white */}
                        <h2 className="text-3xl font-bold mb-10 font-nourd text-white">What Our Clients Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Testimonial card background to green-2 */}
                            <div className="bg-green-2 p-8 rounded-lg shadow-md">
                                {/* Paragraph text to custom white */}
                                <p className="text-lg italic mb-6 text-white">
                                    "GoTalent NG revolutionized our hiring process. Their understanding of our needs in the FinTech space was unparalleled, and they delivered top talent swiftly. Highly recommended!"
                                </p>
                                {/* Author text to custom white */}
                                <p className="font-semibold text-right text-white">- CEO, Leading FinTech Startup</p>
                            </div>
                            {/* Testimonial card background to green-2 */}
                            <div className="bg-green-2 p-8 rounded-lg shadow-md">
                                {/* Paragraph text to custom white */}
                                <p className="text-lg italic mb-6 text-white">
                                    "Thanks to GoTalent, I landed my dream role in a multinational tech firm. Their career coaching and interview prep were invaluable. They truly care about individual success."
                                </p>
                                {/* Author text to custom white */}
                                <p className="font-semibold text-right text-white">- Senior Software Engineer</p>
                            </div>
                        </div>
                    </section>
                </section>

                {/* Call to action to services */}
                <section className="text-center py-8">
                    {/* Call to action text color changed to green-1 and font-poppins */}
                    <p className="text-xl text-green-1 mb-6 font-poppins">Discover how our expertise can drive your success.</p>
                    {/* Button background changed to blue, hover to green-1, text to white */}
                    <Link to="/services" className="bg-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-1 transition duration-300 ease-in-out shadow-lg">
                        View All Services
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default About;
