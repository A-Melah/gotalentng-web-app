import React from 'react';

const TermsOfService = () => {
    return (
        <div className="terms-of-service-page py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Terms of Service</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                        By accessing and using the website and services of GoTalent NG Limited ("GoTalent NG", "we", "us", or "our"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our website or services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">2. Services Offered</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        GoTalent NG provides a range of human capital solutions, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Business Advisory</li>
                        <li>Project Management</li>
                        <li>Talent-as-a-Service (Recruitment, Executive Search, Staffing)</li>
                        <li>Career Development (CV optimization, coaching, interview prep)</li>
                        <li>Training & Development (Upskilling programs, bootcamps)</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        Specific terms and conditions for each service may be outlined in separate agreements.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">3. User Obligations</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        As a user of our website and services, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Provide accurate, current, and complete information during registration and form submissions.</li>
                        <li>Use our services only for lawful purposes and in accordance with these Terms.</li>
                        <li>Refrain from any activity that interferes with or disrupts the website or services.</li>
                        <li>Maintain the confidentiality of any account credentials you may have.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">4. Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed">
                        All content on this website, including text, graphics, logos, icons, images, and software, is the property of GoTalent NG Limited or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">5. Disclaimers and Limitation of Liability</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        The information on this website is provided "as is" without any warranties, express or implied. GoTalent NG does not guarantee the accuracy, completeness, or usefulness of any information and disclaims all liability for errors or omissions in the content.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        To the fullest extent permitted by law, GoTalent NG shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services; or (c) unauthorized access, use, or alteration of your transmissions or content.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">6. Governing Law</h2>
                    <p className="text-gray-700 leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Nigeria.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">7. Changes to Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the revised Terms on this page. Your continued use of the website and services after any such changes constitutes your acceptance of the new Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">8. Contact Information</h2>
                    <p className="text-gray-700 leading-relaxed">
                        If you have any questions about these Terms, please contact us:
                    </p>
                    <p className="text-gray-700 mt-4">
                        **Email:** <a href="mailto:info@gotalentng.com" className="text-indigo-700 hover:underline">info@gotalentng.com</a><br />
                        **Phone:** <a href="tel:+2348012345678" className="text-indigo-700 hover:underline">+234 801 234 5678</a>
                    </p>
                </section>

                <div className="mt-12 text-sm text-gray-500 text-center">
                    <p>Last updated: June 19, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
