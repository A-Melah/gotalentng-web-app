import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { auth, db } from './firebase-config'; // Import Firebase auth and db instances
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import auth functions

// Import all page components from the 'pages' directory.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import TrainingRegistration from './pages/TrainingRegistration.jsx';
import TalentRequest from './pages/TalentRequest.jsx';
import WhyChooseUs from './pages/WhyChooseUs.jsx'; // Changed from .jsx to no extension for consistency
import ContactUs from './pages/ContactUs.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

// NEW: Import new auth and profile pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import ProfileEdit from './pages/ProfileEdit.jsx'; // Placeholder for profile editing

const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const location = useLocation(); // Gets current URL location
    const servicesRef = useRef(null); // Ref for desktop services dropdown
    const mobileMenuRef = useRef(null); // Ref for mobile menu container

    // Firebase User State
    const [currentUser, setCurrentUser] = useState(null); // Stores Firebase user object
    const [isAuthReady, setIsAuthReady] = useState(false); // To know when Firebase auth state is checked

    // Firebase Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsAuthReady(true);
            console.log("Auth state changed:", user ? user.uid : "No user");
        });
        // Cleanup subscription on unmount
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

    // Toggles the main mobile menu open/closed state.
    // It is directly attached to the mobile menu button's onClick.
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        // Ensure services dropdown is closed if mobile menu is toggled manually
        setIsServicesDropdownOpen(false);
    };

    // Handles closing menus when clicking outside them (desktop services dropdown and mobile menu).
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close desktop services dropdown if click is outside of it
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setIsServicesDropdownOpen(false);
            }
            // Close mobile menu if open and click is outside of it AND not on the mobile menu button itself
            // We use event.target.closest to check if the click originated from the button or its children (like the SVG icon)
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('#mobile-menu-button')) {
                if (isMobileMenuOpen) {
                    setIsMobileMenuOpen(false);
                    setIsServicesDropdownOpen(false); // Also close services dropdown if it was open within mobile menu
                }
            }
        };
        // Add mousedown listener to the document
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup function to remove the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [servicesRef, mobileMenuRef, isMobileMenuOpen]); // Dependencies ensure listener updates if these refs/state change

    // Centralized Anchor Scrolling Logic:
    // This useEffect handles all scrolling to hash IDs (`#section-id`) and scrolling to top.
    // It runs whenever the `location` object changes (i.e., on route changes or hash changes).
    useEffect(() => {
        // Automatically close mobile menu and services dropdown on any navigation/hash change
        // This is crucial for a smooth user experience
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);

        if (location.hash) {
            const id = location.hash.substring(1); // Get the ID from the hash (e.g., "business-advisory")
            const element = document.getElementById(id);

            if (element) {
                // Use requestAnimationFrame for smoother scrolling, ensures DOM is ready
                requestAnimationFrame(() => {
                    const headerOffset = 96; // Approximate height of your fixed header (6rem * 16px/rem = 96px)
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    console.log(`Scrolling to #${id} with offset ${headerOffset}.`); // Debugging log
                });
            } else {
                console.warn(`Element with ID '${id}' not found for scrolling.`); // Debugging log
            }
        } else {
            // Scroll to the top of the page if no hash is present (e.g., navigating to /home or /about)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("Scrolling to top."); // Debugging log
        }
    }, [location]); // Dependency array: Effect runs when 'location' object changes


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

    const footerLinks = [
        { path: '/privacy-policy', name: 'Privacy Policy' },
        { path: '/terms-of-service', name: 'Terms of Service' },
        { path: '/contact', name: 'Contact Us' }
    ];

    // Show a loading state until Firebase Auth is ready
    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-indigo-700 text-xl font-semibold">Loading application...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-gray-800 font-inter min-h-screen flex flex-col">
            <header className="bg-white shadow-md py-4 z-50 sticky top-0">
                <nav className="container mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-indigo-700">GoTalent NG</span>
                    </Link>

                    {/* Mobile Menu Button (Hamburger) - Only visible on small screens (hidden on md and up) */}
                    <div className="md:hidden">
                        <button id="mobile-menu-button" onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none focus:text-indigo-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Links - Hidden on small screens, displayed as flex on md and up */}
                    {/* Added responsive space-x classes: smaller gap on medium screens, larger on large/xl screens */}
                    {/* Added responsive text sizing for links */}
                    <ul className="hidden md:flex flex-1 justify-end md:space-x-3 lg:space-x-5 xl:space-x-8 items-center">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative" ref={link.name === 'Services' ? servicesRef : null}>
                                {link.dropdown ? (
                                    // Parent "Services" link that triggers a dropdown
                                    <>
                                        <button
                                            onClick={() => setIsServicesDropdownOpen(prev => !prev)}
                                            onMouseEnter={() => setIsServicesDropdownOpen(true)}
                                            className={`font-medium transition duration-300 ease-in-out flex items-center
                                                ${location.pathname === link.path || link.dropdown.some(item => location.pathname === item.path.split('#')[0])
                                                    ? 'text-indigo-700 font-bold'
                                                    : 'text-gray-600 hover:text-indigo-700'}
                                                md:text-xs lg:text-sm xl:text-base`}
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
                                                        to={link.path} // e.g., /services
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                        onClick={() => setIsServicesDropdownOpen(false)} // Close dropdown on click
                                                    >
                                                        All Services
                                                    </Link>
                                                </li>
                                                {link.dropdown.map((item) => (
                                                    <li key={item.path}>
                                                        <Link
                                                            to={item.path} // e.g., /services#business-advisory
                                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                            // Close dropdown on click
                                                            onClick={() => { setIsServicesDropdownOpen(false); }}
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
                                        className={`font-medium transition duration-300 ease-in-out
                                            ${location.pathname === link.path
                                                ? 'text-indigo-700 font-bold'
                                                : 'text-gray-600 hover:text-indigo-700'}
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
                                    className={`font-medium transition duration-300 ease-in-out
                                        ${location.pathname === '/profile'
                                            ? 'text-indigo-700 font-bold'
                                            : 'text-gray-600 hover:text-indigo-700'}
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
                                        className={`font-medium transition duration-300 ease-in-out
                                            ${location.pathname === '/login'
                                                ? 'text-indigo-700 font-bold'
                                                : 'text-gray-600 hover:text-indigo-700'}
                                            md:text-xs lg:text-sm xl:text-base`}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="bg-indigo-600 text-white md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-full font-bold hover:bg-indigo-700 transition duration-300 ease-in-out md:text-xs lg:text-sm xl:text-base"
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
                                    className="bg-red-500 text-white md:px-3 md:py-1 lg:px-4 lg:py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 ease-in-out md:text-xs lg:text-sm xl:text-base"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/contact"
                                className={`font-medium transition duration-300 ease-in-out
                                    ${location.pathname === '/contact'
                                        ? 'text-indigo-700 font-bold'
                                        : 'text-gray-600 hover:text-indigo-700'}
                                    md:text-xs lg:text-sm xl:text-base`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Navigation Menu - Visible ONLY on screens smaller than md */}
                {/* This entire div is conditionally rendered based on isMobileMenuOpen */}
                <div ref={mobileMenuRef} className={`md:hidden bg-white mt-2 py-2 shadow-lg rounded-lg mx-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    <ul className="flex flex-col space-y-2 px-4">
                        {navLinks.map((link) => (
                            <React.Fragment key={link.name}>
                                {link.dropdown ? (
                                    // Parent "Services" link in mobile, acts as a button to toggle its dropdown
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
                                                {/* Re-added "All Services" link for mobile dropdown */}
                                                <li>
                                                    <Link
                                                        to={link.path} // e.g., /services
                                                        className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                        onClick={() => {
                                                            setIsServicesDropdownOpen(false); // Close services dropdown
                                                            toggleMobileMenu(); // Close main mobile menu
                                                        }}
                                                    >
                                                        All Services
                                                    </Link>
                                                </li>
                                                {link.dropdown.map((item) => (
                                                    <li key={item.path}>
                                                        <Link
                                                            to={item.path} // This links to /services#id
                                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition duration-150 rounded-md"
                                                            // Close both services dropdown AND main mobile menu on click
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
                                    // Standard navigation link in mobile menu (no dropdown)
                                    <li>
                                        <Link
                                            to={link.path}
                                            onClick={toggleMobileMenu} // Close mobile menu when a direct link is clicked
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
                        {/* Auth Links for Mobile */}
                        {currentUser ? (
                            <li>
                                <Link
                                    to="/profile"
                                    onClick={toggleMobileMenu} // Close mobile menu on click
                                    className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                        location.pathname === '/profile'
                                            ? 'text-indigo-700 font-bold'
                                            : 'text-gray-600 hover:text-indigo-700'
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
                                        onClick={toggleMobileMenu} // Close mobile menu on click
                                        className={`block py-2 font-medium transition duration-300 ease-in-out ${
                                            location.pathname === '/login'
                                                ? 'text-indigo-700 font-bold'
                                                : 'text-gray-600 hover:text-indigo-700'
                                        }`}
                                >
                                    Login
                                </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        onClick={toggleMobileMenu} // Close mobile menu on click
                                        className="block bg-indigo-600 text-white px-4 py-2 rounded-full font-bold hover:bg-indigo-700 transition duration-300 ease-in-out text-center"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {currentUser && (
                            <li>
                                <button
                                    onClick={() => { handleLogout(); toggleMobileMenu(); }} // Close mobile menu on logout
                                    className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 ease-in-out"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/contact"
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
                    <Route path="/services" element={<Services />} />
                    <Route path="/training" element={<TrainingRegistration />} />
                    <Route path="/talent-request" element={<TalentRequest />} />
                    <Route path="/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    {/* Auth & Profile Routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Pass currentUser and db to Profile/ProfileEdit */}
                    <Route path="/profile" element={<Profile currentUser={currentUser} db={db} />} />
                    <Route path="/profile/edit" element={<ProfileEdit currentUser={currentUser} db={db} />} />
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
