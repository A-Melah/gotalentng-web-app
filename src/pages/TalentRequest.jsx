import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const TalentRequest = () => {
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
            navigate('/thank-you?form=talent'); // Redirect to a success page

        } catch (error) {
            console.error("Form submission error:", error);
            setStatusMessage('Failed to submit request. Please try again.');
            setIsSuccess(false);
            setIsLoading(false);
        }
        // No need for setTimeout here as we are redirecting
    };

    return (
        <div className="talent-request-page py-16 px-4 bg-gray-50">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Request Top Talent</h1>
                <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
                    At GoTalent NG, we understand that building a high-performing team is crucial for your business success. Tell us about your talent needs, and let us connect you with exceptional professionals.
                </p>

                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Talent Request Form</h2>

                    {statusMessage && (
                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {statusMessage}
                        </div>
                    )}

                    {/* Netlify Form: Add data-netlify="true" and hidden form-name input */}
                    <form
                        name="talent-request-form" // This name MUST match the hidden form in index.html
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field" // Honeypot for spam prevention
                        onSubmit={handleSubmit} // Keep the local handleSubmit for UX feedback
                        className="space-y-6"
                    >
                        {/* Hidden Netlify form fields - MUST be here for Netlify to link submissions */}
                        <input type="hidden" name="form-name" value="talent-request-form" />
                        {/* <input type="hidden" name="redirect" value="/thank-you?form=talent" /> */}
                        {/* Honeypot field - must be hidden from human users */}
                        <p className="hidden">
                            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                        </p>

                        <div>
                            <label htmlFor="company-name" className="block text-left text-gray-700 text-sm font-bold mb-2">Company Name</label>
                            <input type="text" id="company-name" name="companyName" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Your Company Name" required />
                        </div>
                        <div>
                            <label htmlFor="contact-person" className="block text-left text-gray-700 text-sm font-bold mb-2">Contact Person Name</label>
                            <input type="text" id="contact-person" name="contactPerson" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Name of Contact Person" required />
                        </div>
                        <div>
                            <label htmlFor="talent-email" className="block text-left text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="talent-email" name="email" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="contact.email@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="talent-phone" className="block text-left text-gray-700 text-sm font-bold mb-2">Phone Number (Optional)</label>
                            <input type="tel" id="talent-phone" name="phoneNumber" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="+234 80XXXXXXXX" />
                        </div>
                        <div>
                            <label htmlFor="talent-type" className="block text-left text-gray-700 text-sm font-bold mb-2">Type of Talent Needed</label>
                            <select id="talent-type" name="talentType" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" required>
                                <option value="">Select talent type</option>
                                <option value="Tech">Tech Professionals (Developers, Data Scientists, UI/UX, QA)</option>
                                <option value="FinTech">FinTech Specialists (Blockchain, Financial Analysts, Risk)</option>
                                <option value="Manufacturing">Manufacturing Professionals (Engineers, Operations, Supply Chain)</option>
                                <option value="Project Management">Project Management</option>
                                <option value="HR/Recruitment">HR / Recruitment</option>
                                <option value="Other">Other (Please describe below)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="talent-message" className="block text-left text-gray-700 text-sm font-bold mb-2">Job Role / Specific Requirements</label>
                            <textarea id="talent-message" name="message" rows="5" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Describe the roles you are looking to fill, specific skills, years of experience, or any other critical requirements."></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-700 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6">
                        Once submitted, our expert talent acquisition team will review your requirements and begin the process of finding the ideal candidates for your organization.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TalentRequest;
