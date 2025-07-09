import React from 'react';
import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual';


const Home = () => {
    return (
        // Apply Poppins globally to the home page
        <div className="home-page font-poppins">
            {/* Hero Section - Updated with text left, image right */}
            <section id="hero-home" className="bg-blue text-white py-16 px-4 relative overflow-hidden md:py-24">
                {/* Overlay for better text readability, adjusted opacity slightly for visual balance */}
                <div className="absolute inset-0 bg-blue opacity-90"></div>
                
                {/* Container for text and image, using flexbox for layout on medium screens and up */}
                <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    {/* Text Content - Left side on desktop, full width on mobile */}
                    <div className="md:w-1/2 lg:w-2/3 mb-8 md:mb-0">
                        {/* Headline reverted to previous version */}
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white font-nourd">
                            Unlock Exceptional Talent & Careers
                        </h1>
                        {/* Sub-text reverted to previous version */}
                        <p className="text-lg md:text-xl max-w-3xl mx-auto md:mx-0 mb-8 text-white">
                            GoTalent NG empowers individuals to achieve their career aspirations and enables businesses to build high-performing teams.
                        </p>
                        {/* Button text reverted to previous version */}
                        <Link to="/services" className="bg-white text-blue px-8 py-3 rounded-full font-bold text-lg hover:bg-beige-3 transition duration-300 ease-in-out shadow-lg">
                            Explore Our Services
                        </Link>
                    </div>

                    {/* Image Content - Right side on desktop, full width on mobile */}
                    <div className="md:w-1/2 lg:w-1/3 flex justify-center md:justify-end">
                        {/* Placeholder image. Replace with your actual image asset. */}
                        {/* <img
                            src="https://placehold.co/600x400/d8cab7/2d3e48?text=Hero+Image"
                            alt="Hero section visual"
                            className="w-full max-w-sm md:max-w-full h-auto rounded-lg shadow-xl object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/d8cab7/2d3e48?text=Hero+Image"; }}
                        /> */}
                        <HeroVisual />
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            {/* Background to custom white */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto text-center max-w-4xl">
                    {/* Heading font to Nourd, text to green-1 */}
                    <h2 className="text-3xl md:text-4xl font-bold text-green-1 mb-8 font-nourd">Your Partner in Growth and Opportunity</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-lg text-green-1 leading-relaxed mb-6">
                        At GoTalent NG, we bridge the gap between ambitious individuals seeking their next big career move and forward-thinking businesses in Tech, FinTech, and Manufacturing looking for top-tier talent. Our comprehensive solutions are designed to foster growth, drive innovation, and ensure lasting success.
                    </p>
                    <p className="text-lg text-green-1 leading-relaxed">
                        From expert recruitment and strategic project delivery to personalized career development and cutting-edge training programs, we are committed to empowering both people and organizations to reach their full potential.
                    </p>
                </div>
            </section>

            {/* Key Offerings Highlights */}
            {/* Background to beige-3 */}
            <section className="py-16 px-4 bg-beige-3">
                <div className="container mx-auto">
                    {/* Heading font to Nourd, text to green-1 */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-1 mb-12 font-nourd">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Talent Solutions Card */}
                        {/* Background to custom white, text to green-1 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            {/* SVG icon color to blue */}
                            <div className="text-blue mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.146-1.285-.413-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.146-1.285.413-1.857m0 0a5.002 5.002 0 019.174 0M13 16h.01M12 11V9m0 3v2m0 6h.01"></path></svg>
                            </div>
                            {/* Card title font to Nourd, text to blue */}
                            <h3 className="text-2xl font-semibold text-blue mb-3 font-nourd">Talent Solutions</h3>
                            {/* Paragraph text to green-1 */}
                            <p className="text-green-1 mb-4">
                                Connect with top-tier professionals quickly and efficiently. From executive search to contract staffing, we find the perfect fit for your team.
                            </p>
                            {/* Link text to blue, hover text to green-1 */}
                            <Link to="/talent-request" className="text-blue hover:text-green-1 font-medium">Request Talent &rarr;</Link>
                        </div>

                        {/* Career Development Card */}
                        {/* Background to custom white, text to green-1 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            {/* SVG icon color to green-3 */}
                            <div className="text-green-3 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            {/* Card title font to Nourd, text to green-2 */}
                            <h3 className="text-2xl font-semibold text-green-2 mb-3 font-nourd">Career Development</h3>
                            {/* Paragraph text to green-1 */}
                            <p className="text-green-1 mb-4">
                                Empowering individuals with personalized coaching, CV optimization, interview prep, and job search strategies.
                            </p>
                            {/* Link text to green-3, hover text to green-1 */}
                            <Link to="/services" className="text-green-3 hover:text-green-1 font-medium">Learn More &rarr;</Link>
                        </div>

                        {/* Training & Upskilling Card */}
                        {/* Background to custom white, text to green-1 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
                            {/* SVG icon color to blue */}
                            <div className="text-blue mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            {/* Card title font to Nourd, text to blue */}
                            <h3 className="text-2xl font-semibold text-blue mb-3 font-nourd">Training & Upskilling</h3>
                            {/* Paragraph text to green-1 */}
                            <p className="text-green-1 mb-4">
                                Equip your teams with the latest skills through technical bootcamps and leadership workshops tailored to your needs.
                            </p>
                            {/* Link text to blue, hover text to green-1 */}
                            <Link to="/training" className="text-blue hover:text-green-1 font-medium">Register for Training &rarr;</Link>
                        </div>
                    </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                {/* Background to blue, text to custom white */}
                <section className="bg-blue text-white py-16 px-4">
                    <div className="container mx-auto text-center">
                        {/* Heading font to Nourd, text to custom white */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-nourd">Ready to Transform Your Business or Career?</h2>
                        {/* Paragraph text to custom white */}
                        <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
                            Whether you're a business seeking exceptional talent or an individual aiming for career breakthrough, GoTalent NG is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Button background to custom white, text to blue, hover background to beige-3 */}
                            <Link to="/contact" className="bg-white text-blue px-8 py-3 rounded-full font-bold text-lg hover:bg-beige-3 transition duration-300 ease-in-out shadow-lg">
                                Contact Us Today
                            </Link>
                            {/* Border and text to custom white, hover background to custom white, hover text to blue */}
                            <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue transition duration-300 ease-in-out shadow-lg">
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
    );
};

export default Home;
