import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Removed all Firebase imports

// Import all page components from the 'pages' directory.
// !!! IMPORTANT: The errors "Could not resolve" mean your VS Code / OS is NOT finding these files.
// !!! DOUBLE-CHECK THE NAMES AND CASE SENSITIVITY IN YOUR FILE EXPLORER / VS CODE SIDEBAR.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx'; // Main services page
import TrainingRegistration from './pages/TrainingRegistration.jsx';
import TalentRequest from './pages/TalentRequest.jsx';
import WhyChooseUs from './pages/WhyChooseUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const location = useLocation();
    const servicesRef = useRef(null);

    // All Firebase-related state variables and useEffect hook have been removed.
    // The app will load directly without any database interaction.

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    // Close mobile menu and services dropdown on route change, and scroll to top
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
        if (!location.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.pathname]);

    // Close services dropdown when clicking outside of it (for desktop)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setIsServicesDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [servicesRef]);

    // Define navigation links, with a nested array for services
    const navLinks = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About Us' },
        {
            name: 'Services',
            path: '/services',
            dropdown: [
                { path: '/services#business-advisory', name: 'Business Advisory' },
                { path: '/services#project-management', name: 'Project Management' },
                { path: '/services#talent-as-a-service', name: 'Talent-as-a-Service' },
                { path: '/services#career-development', name: 'Career Development' },
                { path: '/services#training-development', name: 'Training & Development' },
            ],
        },
        { path: '/training', name: 'Register for Training' },
        { path: '/talent-request', name: 'Request Talent' },
        { path: '/why-choose-us', name: 'Why Choose Us' },
    ];

    // Consolidated footer links for cleaner rendering
    const footerLinks = [
        { path: '/privacy-policy', name: 'Privacy Policy' },
        { path: '/terms-of-service', name: 'Terms of Service' },
        { path: '/contact', name: 'Contact Us' }
    ];

    // Removed FirebaseReady loading check. The app will always render immediately.

    return (
        <div className="bg-gray-50 text-gray-800 font-inter min-h-screen flex flex-col">
            <header className="bg-white shadow-md py-4 z-50 sticky top-0">
                <nav className="container mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-indigo-700">GoTalent NG</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none focus:text-indigo-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative" ref={link.name === 'Services' ? servicesRef : null}>
                                {link.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setIsServicesDropdownOpen(prev => !prev)}
                                            onMouseEnter={() => setIsServicesDropdownOpen(true)}
                                            className={`font-medium transition duration-300 ease-in-out flex items-center ${
                                                location.pathname === link.path || link.dropdown.some(item => location.pathname === item.path.split('#')[0])
                                                    ? 'text-indigo-700 font-bold'
                                                    : 'text-gray-600 hover:text-indigo-700'
                                            }`}
                                        >
                                            {link.name}
                                            <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {isServicesDropdownOpen && (
                                            <ul
                                                onMouseLeave={() => setIsServicesDropdownOpen(false)}
                                                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 origin-top-left animate-fade-in"
                                            >
                                                <li>
                                                    <Link
                                                        to={link.path}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                        onClick={() => { setIsServicesDropdownOpen(false); toggleMobileMenu(); }}
                                                    >
                                                        All Services
                                                    </Link>
                                                </li>
                                                {link.dropdown.map((item) => (
                                                    <li key={item.path}>
                                                        <Link
                                                            to={item.path}
                                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                            onClick={() => { setIsServicesDropdownOpen(false); toggleMobileMenu(); }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`font-medium transition duration-300 ease-in-out ${
                                            location.pathname === link.path
                                                ? 'text-indigo-700 font-bold'
                                                : 'text-gray-600 hover:text-indigo-700'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                         {/* Adding Contact Us link to the desktop nav as well, for consistency */}
                         <li>
                            <Link
                                to="/contact"
                                className={`font-medium transition duration-300 ease-in-out ${
                                    location.pathname === '/contact'
                                        ? 'text-indigo-700 font-bold'
                                        : 'text-gray-600 hover:text-indigo-700'
                                }`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden bg-white mt-2 py-2 shadow-lg rounded-lg mx-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    <ul className="flex flex-col space-y-2 px-4">
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                {link.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsServicesDropdownOpen(prev => !prev);
                                            }}
                                            className={`w-full text-left py-2 font-medium transition duration-300 ease-in-out flex items-center justify-between ${
                                                location.pathname === link.path || link.dropdown.some(item => location.pathname === item.path.split('#')[0])
                                                    ? 'text-indigo-700 font-bold'
                                                    : 'text-gray-600 hover:text-indigo-700'
                                            }`}
                                        >
                                            {link.name}
                                            <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {isServicesDropdownOpen && (
                                            <ul className="pl-4 border-l border-gray-200 mt-2 space-y-1">
                                                <li>
                                                    <Link
                                                        to={link.path}
                                                        className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                        onClick={() => { setIsServicesDropdownOpen(false); toggleMobileMenu(); }}
                                                    >
                                                        All Services
                                                    </Link>
                                                </li>
                                                {link.dropdown.map((item) => (
                                                    <li key={item.path}>
                                                        <Link
                                                            to={item.path}
                                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                            onClick={() => { setIsServicesDropdownOpen(false); toggleMobileMenu(); }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <li>
                                        <Link
                                            to={link.path}
                                            onClick={toggleMobileMenu}
                                            className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                                location.pathname === link.path
                                                    ? 'text-indigo-700 font-bold'
                                                    : 'text-gray-600 hover:text-indigo-700'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                         {/* Adding Contact Us link to the mobile nav as well, for consistency */}
                         <li>
                            <Link
                                to="/contact"
                                onClick={toggleMobileMenu}
                                className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                    location.pathname === '/contact'
                                        ? 'text-indigo-700 font-bold'
                                        : 'text-gray-600 hover:text-indigo-700'
                                }`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    {/* Removed db and userId props as Firebase is no longer used */}
                    <Route path="/services" element={<Services />} />
                    <Route path="/training" element={<TrainingRegistration />} />
                    <Route path="/talent-request" element={<TalentRequest />} />
                    <Route path="/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                </Routes>
            </main>

            <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 GoTalent NG Limited. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        {footerLinks.map((link) => (
                             <Link key={link.path} to={link.path} className="text-gray-400 hover:text-white transition duration-300 ease-in-out">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
