import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TrainingRegistration = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage('');
        setIsSuccess(false);

        // For Netlify Forms, the browser's native form submission is used
        // so you don't typically need a fetch API call here.
        // The onSubmit handler is primarily for client-side validation,
        // displaying loading states, and then resetting the form.

        // You can still log data locally for development purposes if you wish:
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Training Registration Form Data (to be sent to Netlify):", data);

        // IMPORTANT: The actual submission to Netlify happens via the browser
        // when the form is submitted because of `data-netlify="true"`.
        // We're just simulating a client-side delay for UX feedback here.
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate success feedback
        setStatusMessage('Registration submitted successfully! We will get in touch shortly.');
        setIsSuccess(true);
        e.target.reset(); // Clear the form fields

        // Clear message after a few seconds
        setTimeout(() => setStatusMessage(''), 5000);
        setIsLoading(false);
    };

    return (
        <div className="training-registration-page py-16 px-4 bg-white">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Register for Training</h1>
                <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
                    Empower yourself or your team with cutting-edge skills and knowledge. Our training programs are designed to equip you for success in today's demanding professional landscape.
                </p>

                <div className="bg-gray-50 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Training Registration Form</h2>

                    {statusMessage && (
                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {statusMessage}
                        </div>
                    )}

                    {/* Netlify Form: Add data-netlify="true" and hidden form-name input */}
                    <form
                        name="training-registration-form" // This name MUST match the hidden form in index.html
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field" // Honeypot for spam prevention
                        onSubmit={handleSubmit} // Keep the local handleSubmit for UX feedback
                        className="space-y-6"
                    >
                        {/* Hidden Netlify form fields - MUST be here for Netlify to link submissions */}
                        <input type="hidden" name="form-name" value="training-registration-form" />
                        {/* Honeypot field - must be hidden from human users */}
                        <p className="hidden">
                            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                        </p>

                        <div>
                            <label htmlFor="training-name" className="block text-left text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" id="training-name" name="fullName" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Your Full Name" required />
                        </div>
                        <div>
                            <label htmlFor="training-email" className="block text-left text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="training-email" name="email" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="your.email@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="training-phone" className="block text-left text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input type="tel" id="training-phone" name="phoneNumber" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="+234 80XXXXXXXX" required />
                        </div>
                        <div>
                            <label htmlFor="training-program" className="block text-left text-gray-700 text-sm font-bold mb-2">Desired Training Program</label>
                            <select id="training-program" name="program" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" required>
                                <option value="">Select a program</option>
                                <option value="Staff Training & Upskilling">Staff Training & Upskilling Programs</option>
                                <option value="Technical Bootcamps">Technical Bootcamps (Cloud, DevOps, Cybersecurity, etc.)</option>
                                <option value="Soft Skills & Leadership">Soft Skills & Leadership Workshops</option>
                                <option value="Custom Learning Paths">Custom Learning Paths for Teams</option>
                                <option value="Other">Other (Please specify in message)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="training-message" className="block text-left text-gray-700 text-sm font-bold mb-2">Your Message / Specific Interests</label>
                            <textarea id="training-message" name="message" rows="4" className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" placeholder="Any specific requirements or questions about our training programs?"></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-700 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-800 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6">
                        Upon submission, our team will review your registration and contact you with further details regarding your chosen program.
                    </p>
                    <div className="mt-8">
                        <a href="https://www.africau.edu/images/default/sample.pdf" download="GoTalent_Training_Brochure.pdf" className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition duration-300 ease-in-out shadow-lg">
                            Download Our Full Training Brochure & Fees
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingRegistration;
