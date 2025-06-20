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
        console.log("Contact Us Form Data (to be sent to Netlify):", data);

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
            navigate('/thank-you'); // Redirect to a success page

        } catch (error) {
            console.error("Form submission error:", error);
            setStatusMessage('Failed to send message. Please try again.');
            setIsSuccess(false);
            setIsLoading(false);
        }
        // No need for setTimeout here as we are redirecting
    };

    return (
        <div className="contact-us-page py-16 px-4 bg-white">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Get in Touch with GoTalent NG</h1>
                <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
                    We're here to answer your questions, discuss your needs, and help you unlock your next opportunity or find your next great hire. Reach out to us through any of the methods below.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-stretch md:space-x-8 space-y-8 md:space-y-0">
                    {/* Email Contact Card */}
                    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-indigo-50 w-full md:w-1/3 hover:shadow-xl transition duration-300">
                        <svg className="w-12 h-12 text-indigo-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-700 mb-2">For general inquiries and support.</p>
                        <a href="mailto:info@gotalentng.com" className="text-indigo-700 hover:underline font-medium">info@gotalentng.com</a>
                    </div>

                    {/* Phone Contact Card */}
                    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-indigo-50 w-full md:w-1/3 hover:shadow-xl transition duration-300">
                        <svg className="w-12 h-12 text-indigo-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-700 mb-2">Speak directly with our team.</p>
                        <a href="tel:+2348012345678" className="text-indigo-700 hover:underline font-medium">+234 801 234 5678</a> {/* Placeholder number */}
                    </div>

                    {/* Office Hours/Location Card */}
                    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-indigo-50 w-full md:w-1/3 hover:shadow-xl transition duration-300">
                        <svg className="w-12 h-12 text-indigo-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m0 0A7.955 7.955 0 015 12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.988-.741 3.83-2.079 5.253M12 10v4m0 0h4m-4 0h-4"></path></svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Office</h3>
                        <p className="text-gray-700 mb-2">Visit us during business hours.</p>
                        <p className="text-gray-700 text-sm">
                            GoTalent NG Limited<br/>
                            [Your Office Address Line 1]<br/>
                            [Your Office Address Line 2], Nigeria
                        </p>
                        <p className="text-gray-600 text-sm mt-2">Mon - Fri: 9:00 AM - 5:00 PM WAT</p>
                        <a href="https://maps.app.goo.gl/YourGoogleMapsLink" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline font-medium mt-2">Get Directions</a>
                    </div>
                </div>

                {/* General Message Form */}
                <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>

                    {statusMessage && (
                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
                        {/* <input type="hidden" name="redirect" value="/thank-you" /> */}

                        {/* Honeypot field - must be hidden from human users */}
                        <p className="hidden">
                            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                        </p>

                        <div>
                            <label htmlFor="contact-name" className="block text-left text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input type="text" id="contact-name" name="name" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-left text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="contact-email" name="email" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="your.email@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="contact-subject" className="block text-left text-gray-700 text-sm font-bold mb-2">Subject (Optional)</label>
                            <input type="text" id="contact-subject" name="subject" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Subject of your message" />
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="block text-left text-gray-700 text-sm font-bold mb-2">Your Message</label>
                            <textarea id="contact-message" name="message" rows="5" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Your message..." required></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-700 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6">
                        We aim to respond to all inquiries within 24-48 business hours. Thank you for your patience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
