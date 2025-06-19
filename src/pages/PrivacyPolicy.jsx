import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page py-16 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Privacy Policy</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">1. Introduction</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to GoTalent NG Limited. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our website and services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">2. Information We Collect</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We may collect various types of information, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>**Personal Identification Information:** Name, email address, phone number, physical address, and other contact details provided during registration, form submission, or direct communication.</li>
                        <li>**Professional Information:** CVs, cover letters, employment history, education, skills, and career preferences, if you are a job seeker.</li>
                        <li>**Business Information:** Company name, industry, talent requirements, and project details, if you are a business client.</li>
                        <li>**Technical Data:** IP address, browser type, operating system, referral sources, website usage data (e.g., pages viewed, time spent), collected via cookies and analytics tools.</li>
                        <li>**Communication Data:** Records of your correspondence with us.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">3. How We Use Your Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We use the collected information for various purposes, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>To provide and manage our services (recruitment, training, advisory, project management).</li>
                        <li>To respond to your inquiries, requests, and applications.</li>
                        <li>To match job seekers with suitable employment opportunities.</li>
                        <li>To understand business needs and provide tailored talent solutions.</li>
                        <li>To process training registrations and deliver training programs.</li>
                        <li>To improve our website, services, and user experience.</li>
                        <li>For internal record keeping and administrative purposes.</li>
                        <li>To send you marketing and promotional communications (with your consent, where required).</li>
                        <li>To comply with legal obligations and enforce our terms and conditions.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">4. Data Sharing and Disclosure</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We may share your information with:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>**Third-Party Service Providers:** Who assist us in operating our website, conducting our business, or serving our users (e.g., hosting providers, analytics services, email marketing platforms).</li>
                        <li>**Business Clients/Partners:** If you are a job seeker, your professional information may be shared with potential employers or clients for recruitment purposes, with your explicit consent.</li>
                        <li>**Legal Requirements:** When required by law or in response to valid requests by public authorities.</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">5. Data Security</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">6. Your Rights</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Depending on your location and applicable data protection laws, you may have the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Access the personal information we hold about you.</li>
                        <li>Request correction of inaccurate or incomplete data.</li>
                        <li>Request deletion of your personal data.</li>
                        <li>Object to or restrict the processing of your data.</li>
                        <li>Withdraw consent at any time (where processing is based on consent).</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        To exercise any of these rights, please contact us using the details provided in Section 8.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">7. Changes to This Privacy Policy</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">8. Contact Us</h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <p className="text-gray-700 mt-4">
                        **Email:** <a href="mailto:info@gotalentng.com" className="text-indigo-700 hover:underline">info@gotalentng.com</a><br />
                        **Phone:** <a href="tel:+2348012345678" className="text-indigo-700 hover:underline">+234 801 234 5678</a><br />
                        **Address:** [Your Office Address Line 1], [Your Office Address Line 2], Nigeria
                    </p>
                </section>

                <div className="mt-12 text-sm text-gray-500 text-center">
                    <p>Last updated: June 19, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
