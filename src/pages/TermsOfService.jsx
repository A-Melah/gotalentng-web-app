import React from 'react';

const TermsOfService = () => {
    return (
        // Apply Poppins globally to the page, background to beige-3
        <div className="terms-of-service-page py-16 px-4 bg-beige-3 font-poppins">
            <div className="container mx-auto max-w-4xl">
                {/* Main heading font to Nourd, text to green-1 */}
                <h1 className="text-4xl md:text-5xl font-bold text-center text-green-1 mb-12 font-nourd">Terms of Service</h1>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">1. Acceptance of Terms</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed">
                        By accessing and using the website and services of GoTalent NG Limited ("GoTalent NG", "we", "us", or "our"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our website or services.
                    </p>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">2. Services Offered</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed mb-4">
                        GoTalent NG provides a range of human capital solutions, including but not limited to:
                    </p>
                    {/* List items text to green-2 */}
                    <ul className="list-disc list-inside text-green-2 space-y-2">
                        <li>Business Advisory</li>
                        <li>Project Management</li>
                        <li>Talent-as-a-Service (Recruitment, Executive Search, Staffing)</li>
                        <li>Career Development (CV optimization, coaching, interview prep)</li>
                        <li>Training & Development (Upskilling programs, bootcamps)</li>
                    </ul>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed mt-4">
                        Specific terms and conditions for each service may be outlined in separate agreements.
                    </p>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">3. User Obligations</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed mb-4">
                        As a user of our website and services, you agree to:
                    </p>
                    {/* List items text to green-2 */}
                    <ul className="list-disc list-inside text-green-2 space-y-2">
                        <li>Provide accurate, current, and complete information during registration and form submissions.</li>
                        <li>Use our services only for lawful purposes and in accordance with these Terms.</li>
                        <li>Refrain from any activity that interferes with or disrupts the website or services.</li>
                        <li>Maintain the confidentiality of any account credentials you may have.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">4. Intellectual Property</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed">
                        All content on this website, including text, graphics, logos, icons, images, and software, is the property of GoTalent NG Limited or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
                    </p>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">5. Disclaimers and Limitation of Liability</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed mb-4">
                        The information on this website is provided "as is" without any warranties, express or implied. GoTalent NG does not guarantee the accuracy, completeness, or usefulness of any information and disclaims all liability for errors or omissions in the content.
                    </p>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed mt-4">
                        To the fullest extent permitted by law, GoTalent NG shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services; or (c) unauthorized access, use, or alteration of your transmissions or content.
                    </p>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">6. Governing Law</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed">
                        These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Nigeria.
                    </p>
                </section>

                <section className="mb-8">
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">7. Changes to Terms</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed">
                        We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the revised Terms on this page. Your continued use of the website and services after any such changes constitutes your acceptance of the new Terms.
                    </p>
                </section>

                <section>
                    {/* Section heading font to Nourd, text to blue */}
                    <h2 className="text-2xl font-semibold text-blue mb-4 font-nourd">8. Contact Information</h2>
                    {/* Paragraph text to green-1 */}
                    <p className="text-green-1 leading-relaxed">
                        If you have any questions about these Terms, please contact us:
                    </p>
                    {/* Contact details text to green-1, links to blue */}
                    <p className="text-green-1 mt-4">
                        **Email:** <a href="mailto:info@gotalentng.com" className="text-blue hover:underline">info@gotalentng.com</a><br />
                        **Phone:** <a href="tel:+2348012345678" className="text-blue hover:underline">+234 801 234 5678</a>
                    </p>
                </section>

                <div className="mt-12 text-sm text-green-2 text-center">
                    <p>Last updated: June 19, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
