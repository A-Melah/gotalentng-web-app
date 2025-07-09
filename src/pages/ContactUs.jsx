import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ContactUs = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate(); // Initialize navigate hook

    // The handleSubmit function is simplified.
    // It still uses e.preventDefault() for client-side control,
    // but then directly triggers a programmatic submission to Netlify,
    // followed by a navigation to the thank-you page.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage('');
        setIsSuccess(false);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Talent Request Form Data (to be sent to Netlify):", data);

        try {
            // Netlify forms can be submitted via a fetch API call as well,
            // which gives more control over client-side UX before redirect.
            // This is an alternative to purely relying on the browser's native submission.
            // This method keeps your client-side validation/loading, then submits.
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            });

            // After successful submission (via fetch), navigate to the thank-you page.
            // This is the client-side equivalent of the _redirects file for forms.
            // Netlify's _redirects file handles the server-side redirect for non-JS submissions.
            navigate('/thank-you?form=contact'); // Redirect to a success page

        } catch (error) {
            console.error("Form submission error:", error);
            setStatusMessage('Failed to send message. Please try again.');
            setIsSuccess(false);
            setIsLoading(false);
        }
        // No need for setTimeout here as we are redirecting
    };

    return (
        // Apply Poppins globally to the contact us page, background to custom white
        <div className="contact-us-page py-16 px-4 bg-white font-poppins">
            <div className="container mx-auto text-center">
                {/* Main heading font to Nourd, text to green-1 */}
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-1 font-nourd">Get in Touch with GoTalent NG</h1>
                {/* Paragraph text to green-1 */}
                <p className="text-lg text-green-1 mb-10 max-w-3xl mx-auto">
                    We're here to answer your questions, discuss your needs, and help you unlock your next opportunity or find your next great hire. Reach out to us through any of the methods below.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 space-y-8 md:space-y-0 max-w-4xl mx-auto">
                    {/* General Message Form - Left Column */}
                    {/* Background to beige-3 */}
                    <div className="bg-beige-3 p-8 rounded-lg shadow-md w-full md:w-1/2 order-2 md:order-1">
                        {/* Form heading font to Nourd, text to green-1 */}
                        <h2 className="text-2xl font-semibold text-green-1 mb-6 font-nourd">Send Us a Message</h2>

                        {statusMessage && (
                            <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                                isSuccess ? 'bg-green-3 text-green-1' : 'bg-beige-1 text-black'
                            }`}>
                                {statusMessage}
                            </div>
                        )}

                        {/* Netlify Form: Add data-netlify="true" and hidden form-name input */}
                        <form
                            name="contact-us-form" // This name MUST match the hidden form in index.html
                            method="POST"
                            data-netlify="true"
                            netlify-honeypot="bot-field" // Honeypot for spam prevention
                            onSubmit={handleSubmit} // Keep the local handleSubmit for UX feedback
                            className="space-y-6"
                        >
                            {/* Hidden Netlify form fields - MUST be here for Netlify to link submissions */}
                            <input type="hidden" name="form-name" value="contact-us-form" />
                            {/* <input type="hidden" name="redirect" value="/thank-you?form=contact" /> */}

                            {/* Honeypot field - must be hidden from human users */}
                            <p className="hidden">
                                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                            </p>

                            <div>
                                {/* Label text to green-1 */}
                                <label htmlFor="contact-name" className="block text-left text-green-1 text-sm font-bold mb-2">Name</label>
                                {/* Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue */}
                                <input type="text" id="contact-name" name="name" className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Your Name" required />
                            </div>
                            <div>
                                {/* Label text to green-1 */}
                                <label htmlFor="contact-email" className="block text-left text-green-1 text-sm font-bold mb-2">Email</label>
                                {/* Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue */}
                                <input type="email" id="contact-email" name="email" className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="your.email@example.com" required />
                            </div>
                            <div>
                                {/* Label text to green-1 */}
                                <label htmlFor="contact-subject" className="block text-left text-green-1 text-sm font-bold mb-2">Subject (Optional)</label>
                                {/* Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue */}
                                <input type="text" id="contact-subject" name="subject" className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Subject of your message" />
                            </div>
                            <div>
                                {/* Label text to green-1 */}
                                <label htmlFor="contact-message" className="block text-left text-green-1 text-sm font-bold mb-2">Your Message</label>
                                {/* Textarea border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue */}
                                <textarea id="contact-message" name="message" rows="5" className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Your message..." required></textarea>
                            </div>
                            <button
                                type="submit"
                                // Button background to blue, text to custom white, hover background to green-1
                                className="bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        {/* Paragraph text to green-2 */}
                        <p className="text-sm text-green-2 mt-6">
                            We aim to respond to all inquiries within 24-48 business hours. Thank you for your patience.
                        </p>
                    </div>

                    {/* Contact Information - Right Column */}
                    {/* Background to white, shadow and hover shadow remain */}
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 order-1 md:order-2">
                        {/* Heading font to Nourd, text to green-1 */}
                        <h2 className="text-2xl font-semibold text-green-1 mb-6 font-nourd">Our Contact Details</h2>
                        <div className="space-y-6 text-left">
                            {/* Mobile Number */}
                            <div className="flex items-center space-x-3">
                                {/* SVG icon color to blue */}
                                <svg className="w-8 h-8 text-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <div>
                                    {/* Text to green-1 */}
                                    <p className="text-lg font-medium text-green-1">Mobile Number</p>
                                    {/* Link text to blue, hover underline remains */}
                                    <a href="tel:+2348012345678" className="text-blue hover:underline">+234 801 234 5678</a>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                {/* SVG icon color to blue */}
                                <svg className="w-8 h-8 text-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <div>
                                    {/* Text to green-1 */}
                                    <p className="text-lg font-medium text-green-1">Email Address</p>
                                    {/* Link text to blue, hover underline remains */}
                                    <a href="mailto:info@gotalentng.com" className="text-blue hover:underline">info@gotalentng.com</a>
                                </div>
                            </div>
                            {/* Location */}
                            <div className="flex items-center space-x-3">
                                {/* SVG icon color to blue */}
                                <svg className="w-8 h-8 text-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m0 0A7.955 7.955 0 015 12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.988-.741 3.83-2.079 5.253M12 10v4m0 0h4m-4 0h-4"></path>
                                </svg>
                                <div>
                                    {/* Text to green-1 */}
                                    <p className="text-lg font-medium text-green-1">Location</p>
                                    {/* Text to green-1 */}
                                    <p className="text-green-1">Lagos, Nigeria</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
