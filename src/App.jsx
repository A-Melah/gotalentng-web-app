import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { auth, db } from './firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import fulllogo from './assets/full logo dark.svg'; // Import the logo

// Import all page components from the 'pages' directory.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Trainings from './pages/Trainings.jsx'; // Updated from TrainingRegistration
import TalentRequest from './pages/TalentRequest.jsx';
// import WhyChooseUs from './pages/WhyChooseUs.jsx'; // Removed as it's merged into About
import ContactUs from './pages/ContactUs.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

// NEW: Import new auth and profile pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import ProfileEdit from './pages/ProfileEdit.jsx';
import TalentDirectory from './pages/TalentDirectory.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ThankYou from './pages/ThankYou.jsx'; // Added ThankYou page import

const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopServicesDropdownOpen, setIsDesktopServicesDropdownOpen] = useState(false);
    const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);

    // State to store the dynamic header height
    const [headerHeight, setHeaderHeight] = useState(0);

    const location = useLocation();
    const servicesRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileServicesDropdownRef = useRef(null);
    // Ref for the entire header element
    const headerRef = useRef(null);

    // Firebase User State
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Firebase Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsAuthReady(true);
            console.log("Auth state changed:", user ? user.uid : "No user");
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out.");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        setIsDesktopServicesDropdownOpen(false);
        setIsMobileServicesDropdownOpen(false);
    };

    // Handles closing menus when clicking outside them
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setIsDesktopServicesDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('#mobile-menu-button')) {
                if (isMobileMenuOpen) {
                    setIsMobileMenuOpen(false);
                    setIsDesktopServicesDropdownOpen(false);
                    setIsMobileServicesDropdownOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [servicesRef, mobileMenuRef, isMobileMenuOpen]);

    // Measure the header's height dynamically
    useEffect(() => {
        const measureHeaderHeight = () => {
            if (headerRef.current) {
                // Get the height of the header including padding and border
                setHeaderHeight(headerRef.current.offsetHeight);
                console.log("Header height measured:", headerRef.current.offsetHeight, "px");
            }
        };

        // Measure on initial mount
        measureHeaderHeight();

        // Re-measure on window resize to handle responsive changes
        window.addEventListener('resize', measureHeaderHeight);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', measureHeaderHeight);
    }, []);

    // REFINED ANCHOR AND QUERY PARAMETER SCROLLING LOGIC
    useEffect(() => {
        // Automatically close ALL menus on any navigation/hash/query change
        setIsMobileMenuOpen(false);
        setIsDesktopServicesDropdownOpen(false);
        setIsMobileServicesDropdownOpen(false);

        // Use location directly to trigger on any URL change (path, hash, query)
        // This ensures the scroll adjustment runs when query parameters change,
        // which is crucial for the Trainings page.
        const scrollToElement = () => {
            if (location.hash) {
                const id = location.hash.substring(1);
                const element = document.getElementById(id);

                if (element) {
                    // Use a short delay to ensure the DOM has rendered the target element and its position is stable.
                    setTimeout(() => {
                        const headerOffset = headerHeight; // Use the dynamically measured height
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        console.log(`Scrolling to #${id} with dynamic offset ${headerOffset}.`);
                    }, 50); // 50ms delay is usually sufficient

                } else {
                    console.warn(`Element with ID '${id}' not found for scrolling.`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                // If no hash, scroll to the top of the page (or a specific offset if needed for non-hash navigations)
                // This ensures that when navigating to a page with query params but no hash, it starts at the top.
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log("Scrolling to top.");
            }
        };

        scrollToElement(); // Call the scroll function on location change

    }, [location, headerHeight]); // Depend on location and headerHeight

    const navLinks = [
        { path: '/', name: 'Home' },
        // Merged About Us and Why Choose Us
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
        // Changed "Register for Training" to "Trainings"
        { path: '/training', name: 'Trainings' },
        // { path: '/talent-request', name: 'Request Talent' }, // This link is handled by the "Our Talents" page
        // { path: '/why-choose-us', name: 'Why Choose Us' }, // Removed due to merge
        { path: '/talents', name: 'Talents' },
    ];

    const footerLinks = [
        { path: '/privacy-policy', name: 'Privacy Policy' },
        { path: '/terms-of-service', name: 'Terms of Service' },
        { path: '/contact', name: 'Contact Us' }
    ];

    if (!isAuthReady) {
        return (
            // Loading state background to beige-3, text to blue
            <div className="flex justify-center items-center min-h-screen bg-beige-3 font-poppins">
                <div className="text-blue text-xl font-semibold">Loading application...</div>
            </div>
        );
    }

    return (
        // Overall app background to beige-3, default text to green-1, global font to Poppins
        <div className="bg-beige-3 text-green-1 font-poppins min-h-screen flex flex-col">
            {/* Header background to custom white, shadow remains */}
            <header ref={headerRef} className="bg-white shadow-md py-4 z-50 sticky top-0">
                <nav className="container mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        {/* Logo svg */}
                        <img src={fulllogo} alt="gotalent logo" className="h-8" />
                    </Link>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden">
                        {/* Button text to green-1, focus text to blue */}
                        <button id="mobile-menu-button" onClick={toggleMobileMenu} className="text-green-1 focus:outline-none focus:text-blue">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex flex-1 justify-end md:space-x-3 lg:space-x-5 items-center">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative" ref={link.name === 'Services' ? servicesRef : null}>
                                {link.dropdown ? (
                                    // Parent "Services" link that triggers a dropdown
                                    <>
                                        <button
                                            onClick={() => setIsDesktopServicesDropdownOpen(prev => !prev)}
                                            onMouseEnter={() => setIsDesktopServicesDropdownOpen(true)}
                                            // Active link text to blue, inactive to green-1, hover to blue
                                            className={`font-medium transition duration-300 ease-in-out flex items-center whitespace-nowrap
                                                ${location.pathname === link.path || link.dropdown.some(item => location.pathname === item.path.split('#')[0])
                                                    ? 'text-blue font-bold'
                                                    : 'text-green-1 hover:text-blue'}
                                                md:text-xs lg:text-sm xl:text-base`}
                                        >
                                            {link.name}
                                            <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isDesktopServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        {isDesktopServicesDropdownOpen && (
                                            // Dropdown background to custom white, shadow remains
                                            <ul
                                                onMouseLeave={() => setIsDesktopServicesDropdownOpen(false)}
                                                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 origin-top-left animate-fade-in"
                                            >
                                                <li>
                                                    <Link
                                                        to={link.path}
                                                        // Link text to green-1, hover background to beige-3, hover text to blue
                                                        className="block px-4 py-2 text-sm text-green-1 hover:bg-beige-3 hover:text-blue transition duration-150 rounded-md whitespace-nowrap"
                                                        onClick={() => setIsDesktopServicesDropdownOpen(false)}
                                                    >
                                                        All Services
                                                    </Link>
                                                </li>
                                                {link.dropdown.map((item) => (
                                                    <li key={item.path}>
                                                        <Link
                                                            to={item.path}
                                                            // Link text to green-1, hover background to beige-3, hover text to blue
                                                            className="block px-2 py-2 text-sm text-green-1 hover:bg-beige-3 hover:text-blue transition duration-150 rounded-md whitespace-nowrap"
                                                            onClick={() => { setIsDesktopServicesDropdownOpen(false); }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    // Standard navigation link without a dropdown
                                    <Link
                                        to={link.path}
                                        // Active link text to blue, inactive to green-1, hover to blue
                                        className={`font-medium transition duration-300 ease-in-out whitespace-nowrap
                                            ${location.pathname === link.path
                                                ? 'text-blue font-bold'
                                                : 'text-green-1 hover:text-blue'}
                                            md:text-xs lg:text-sm xl:text-base`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                        {/* Auth Links for Desktop */}
                        {currentUser ? (
                            <li className="relative">
                                <Link
                                    to="/profile"
                                    // Active link text to blue, inactive to green-1, hover to blue
                                    className={`font-medium transition duration-300 ease-in-out whitespace-nowrap
                                        ${location.pathname === '/profile'
                                            ? 'text-blue font-bold'
                                            : 'text-green-1 hover:text-blue'}
                                        md:text-xs lg:text-sm xl:text-base`}
                                >
                                    My Profile
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        // Active link text to blue, inactive to green-1, hover to blue
                                        className={`font-medium transition duration-300 ease-in-out whitespace-nowrap
                                            ${location.pathname === '/login'
                                                ? 'text-blue font-bold'
                                                : 'text-green-1 hover:text-blue'}
                                            md:text-xs lg:text-sm xl:text-base`}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        // Button background to blue, text to custom white, hover background to green-1
                                        className="bg-blue text-white md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out md:text-xs lg:text-sm xl:text-base whitespace-nowrap"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {currentUser && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    // Button background to beige-1, text to black, hover background to black
                                    className="bg-beige-1 text-black md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-full font-bold hover:bg-black transition duration-300 ease-in-out md:text-xs lg:text-sm xl:text-base whitespace-nowrap"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/contact"
                                // Active link text to blue, inactive to green-1, hover to blue
                                className={`font-medium transition duration-300 ease-in-out whitespace-nowrap
                                    ${location.pathname === '/contact'
                                        ? 'text-blue font-bold'
                                        : 'text-green-1 hover:text-blue'}
                                    md:text-xs lg:text-sm xl:text-base`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Navigation Menu - Visible ONLY on screens smaller than md */}
                <div
                    ref={mobileMenuRef}
                    className={`
                        md:hidden bg-white mt-2 shadow-lg rounded-lg mx-4
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}
                    `}
                >
                    <ul className="flex flex-col space-y-2 px-4">
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                {link.dropdown ? (
                                    <li>
                                        <button
                                            onClick={() => setIsMobileServicesDropdownOpen(prev => !prev)}
                                            // Active link text to blue, inactive to green-1, hover to blue
                                            className={`w-full text-left py-2 font-medium transition duration-300 ease-in-out flex items-center justify-between ${
                                                location.pathname === link.path || link.dropdown.some(item => location.pathname === item.path.split('#')[0])
                                                    ? 'text-blue font-bold'
                                                    : 'text-green-1 hover:text-blue'
                                            }`}
                                        >
                                            {link.name}
                                            <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isMobileServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        <ul
                                            ref={mobileServicesDropdownRef}
                                            // Dropdown border to beige-2
                                            className={`
                                                pl-4 border-l border-beige-2 mt-2 space-y-1
                                                overflow-hidden transition-all duration-300 ease-in-out
                                                ${isMobileServicesDropdownOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}
                                            `}
                                        >
                                            <li>
                                                <Link
                                                    to={link.path}
                                                    // Link text to green-1, hover background to beige-3, hover text to blue
                                                    className="block px-2 py-2 text-sm text-green-1 hover:bg-beige-3 hover:text-blue transition duration-150 rounded-md"
                                                    onClick={() => {
                                                        setIsMobileServicesDropdownOpen(false);
                                                        toggleMobileMenu();
                                                    }}
                                                >
                                                    All Services
                                                </Link>
                                            </li>
                                            {link.dropdown.map((item) => (
                                                <li key={item.path}>
                                                    <Link
                                                        to={item.path}
                                                        // Link text to green-1, hover background to beige-3, hover text to blue
                                                        className="block px-2 py-2 text-sm text-green-1 hover:bg-beige-3 hover:text-blue transition duration-150 rounded-md"
                                                        onClick={() => { setIsMobileServicesDropdownOpen(false); toggleMobileMenu(); }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ) : (
                                    <li>
                                        <Link
                                            to={link.path}
                                            onClick={toggleMobileMenu}
                                            // Active link text to blue, inactive to green-1, hover to blue
                                            className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                                location.pathname === link.path
                                                    ? 'text-blue font-bold'
                                                    : 'text-green-1 hover:text-blue'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                        {/* Auth Links for Mobile */}
                        {currentUser ? (
                            <li>
                                <Link
                                    to="/profile"
                                    onClick={toggleMobileMenu}
                                    // Active link text to blue, inactive to green-1, hover to blue
                                    className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                        location.pathname === '/profile'
                                            ? 'text-blue font-bold'
                                            : 'text-green-1 hover:text-blue'
                                    }`}
                                >
                                    My Profile
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={toggleMobileMenu}
                                        // Active link text to blue, inactive to green-1, hover to blue
                                        className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                            location.pathname === '/login'
                                                ? 'text-blue font-bold'
                                                : 'text-green-1 hover:text-blue'
                                        }`}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        onClick={toggleMobileMenu}
                                        // Button background to blue, text to custom white, hover background to green-1
                                        className="block bg-blue text-white px-4 py-2 rounded-full font-bold hover:bg-green-1 transition duration-300 ease-in-out text-center"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {currentUser && (
                            <li>
                                <button
                                    onClick={() => { handleLogout(); toggleMobileMenu(); }}
                                    // Button background to beige-1, text to black, hover background to black
                                    className="w-full text-left bg-beige-1 text-black px-4 py-2 rounded-full font-bold hover:bg-black transition duration-300 ease-in-out"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/contact"
                                onClick={toggleMobileMenu}
                                // Active link text to blue, inactive to green-1, hover to blue
                                className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                    location.pathname === '/contact'
                                        ? 'text-blue font-bold'
                                        : 'text-green-1 hover:text-blue'
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
                    <Route path="/services" element={<Services />} />
                    <Route path="/training" element={<Trainings />} /> {/* Updated component name */}
                    <Route path="/talent-request" element={<TalentRequest />} />
                    {/* Removed WhyChooseUs route as it's merged into About */}
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    {/* Auth & Profile Routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    {/* Pass currentUser and db to Profile/ProfileEdit */}
                    <Route path="/profile" element={<Profile currentUser={currentUser} db={db} />} />
                    <Route path="/profile/edit" element={<ProfileEdit currentUser={currentUser} db={db} />} />
                    <Route path="/talents" element={<TalentDirectory />} />
                    {/* Fallback route for 404 */}
                </Routes>
            </main>

            {/* Footer background to green-1, text to beige-3 */}
            <footer className="bg-green-1 text-beige-3 py-8 px-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 GoTalent NG Limited. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        {footerLinks.map((link) => (
                            // Footer link text to beige-2, hover text to custom white
                            <Link key={link.path} to={link.path} className="text-beige-2 hover:text-white transition duration-300 ease-in-out">
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
