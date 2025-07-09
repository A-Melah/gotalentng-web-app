import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Trainings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedProgram = queryParams.get('program');

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [program, setProgram] = useState(preselectedProgram || '');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const trainingOptions = [
        {
            id: 'staff-upskilling',
            title: 'Staff Training & Upskilling Programs',
            description: 'Comprehensive programs to enhance your team\'s existing skills and introduce new ones, ensuring they stay competitive and productive.',
            value: 'Staff Training & Upskilling',
            icon: (
                <svg className="w-16 h-16 mx-auto text-blue mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"></path>
                </svg>
            )
        },
        {
            id: 'technical-bootcamps',
            title: 'Technical Bootcamps (Cloud, DevOps, Cybersecurity, etc.)',
            description: 'Intensive, hands-on bootcamps designed to fast-track technical skills in high-demand areas. Perfect for individuals or corporate teams.',
            value: 'Technical Bootcamps',
            icon: (
                <svg className="w-16 h-16 mx-auto text-green-3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14c2.209 0 4 1.791 4 4v0c0 2.209-1.791 4-4 4H5c-2.209 0-4-1.791-4-4v0c0-2.209 1.791-4 4-4z"></path>
                </svg>
            )
        },
        {
            id: 'soft-skills-leadership',
            title: 'Soft Skills & Leadership Workshops',
            description: 'Develop crucial interpersonal and leadership abilities through interactive workshops focusing on communication, teamwork, and strategic thinking.',
            value: 'Soft Skills & Leadership',
            icon: (
                <svg className="w-16 h-16 mx-auto text-blue mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            )
        },
        {
            id: 'custom-learning-paths',
            title: 'Custom Learning Paths for Teams',
            description: 'Tailored training solutions designed specifically for your organization\'s unique needs and goals, ensuring maximum relevance and impact.',
            value: 'Custom Learning Paths',
            icon: (
                <svg className="w-16 h-16 mx-auto text-green-3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            )
        },
        {
            id: 'other-training',
            title: 'Other Training / Specific Request',
            description: 'Have a unique training need not listed? Describe your specific requirements, and we\'ll work to create a customized solution just for you.',
            value: 'Other',
            icon: (
                <svg className="w-16 h-16 mx-auto text-blue mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            )
        },
    ];

    // This useEffect will update the 'program' state whenever 'preselectedProgram' changes
    useEffect(() => {
        if (preselectedProgram && program !== preselectedProgram) {
            setProgram(preselectedProgram);
            // Optionally, you might want to clear other form fields when a new program is selected
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
            setStatusMessage('');
            setIsSuccess(false);
        }
    }, [preselectedProgram, program]); // Depend on preselectedProgram and program to react to changes


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage('');
        setIsSuccess(false);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Training Registration Form Data (to be sent to Netlify):", data);

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            });

            navigate('/thank-you?form=training');

        } catch (error) {
            console.error("Form submission error:", error);
            setStatusMessage('Failed to submit registration. Please try again.');
            setIsSuccess(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="trainings-page py-16 px-4 bg-beige-3 font-poppins">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-1 font-nourd">Our Training Programs</h1>
                <p className="text-lg text-green-1 mb-10 max-w-3xl mx-auto">
                    Empower yourself or your team with cutting-edge skills and knowledge. Our training programs are designed to equip you for success in today's demanding professional landscape.
                </p>

                {/* Training Program Cards */}
                {!preselectedProgram && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {trainingOptions.map((option) => (
                            <div key={option.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col items-center text-center">
                                {option.icon}
                                <h3 className="text-2xl font-semibold text-blue mb-3 font-nourd">{option.title}</h3>
                                <p className="text-green-1 mb-4 leading-relaxed">{option.description}</p>
                                <Link
                                    to={`/training?program=${encodeURIComponent(option.value)}`}
                                    className="mt-auto bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out shadow-lg"
                                >
                                    Register
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Training Registration Form */}
                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold text-green-1 mb-6 font-nourd">Training Registration Form</h2>

                    {statusMessage && (
                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                            isSuccess ? 'bg-green-3 text-green-1' : 'bg-beige-1 text-black'
                        }`}>
                            {statusMessage}
                        </div>
                    )}

                    <form
                        name="training-registration-form"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <input type="hidden" name="form-name" value="training-registration-form" />
                        <p className="hidden">
                            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                        </p>

                        <div>
                            <label htmlFor="training-name" className="block text-left text-green-1 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" id="training-name" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Your Full Name" required />
                        </div>
                        <div>
                            <label htmlFor="training-email" className="block text-left text-green-1 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="training-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="your.email@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="training-phone" className="block text-left text-green-1 text-sm font-bold mb-2">Phone Number</label>
                            <input type="tel" id="training-phone" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="+234 80XXXXXXXX" required />
                        </div>

                        {/* Conditional rendering for program input */}
                        {program === 'Other' ? (
                            <div>
                                <label htmlFor="training-message" className="block text-left text-green-1 text-sm font-bold mb-2">Your Specific Training Request</label>
                                <textarea id="training-message" name="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Describe the training you are interested in or any specific requirements."></textarea>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="training-program" className="block text-left text-green-1 text-sm font-bold mb-2">Desired Training Program</label>
                                <select id="training-program" name="program" value={program} onChange={(e) => setProgram(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" required>
                                    <option value="">Select a program</option>
                                    {trainingOptions.filter(opt => opt.value !== 'Other').map(opt => (
                                        <option key={opt.id} value={opt.value}>{opt.title}</option>
                                    ))}
                                    <option value="Other">Other (Please specify in message)</option>
                                </select>
                            </div>
                        )}
                        
                        {program !== 'Other' && (
                            <div>
                                <label htmlFor="training-message" className="block text-left text-green-1 text-sm font-bold mb-2">Your Message / Specific Interests (Optional)</label>
                                <textarea id="training-message" name="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="shadow-sm appearance-none border border-beige-2 rounded-lg w-full py-3 px-4 text-green-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition duration-200" placeholder="Any specific requirements or questions about our training programs?"></textarea>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </form>
                    <p className="text-sm text-green-2 mt-6">
                        Upon submission, our team will review your registration and contact you with further details regarding your chosen program.
                    </p>
                    <div className="mt-8">
                        <a href="https://www.africau.edu/images/default/sample.pdf" download="GoTalent_Training_Brochure.pdf"
                            className="inline-block bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out shadow-lg">
                            Download Our Full Training Brochure & Fees
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trainings;
