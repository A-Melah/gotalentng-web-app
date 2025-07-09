import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config'; // Import auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Remove sendPasswordResetEmail

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Remove isResetting and resetMessage states
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully.");
            navigate('/profile'); // Redirect to profile page after successful login
        } catch (err) {
            console.error("Firebase login error:", err);
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('Invalid email or password.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many login attempts. Please try again later.');
                    break;
                default:
                    setError('Login failed. Please check your credentials.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Remove handlePasswordReset function

    return (
        // Apply Poppins globally to the page, background to beige-3
        <div className="flex items-center justify-center min-h-screen bg-beige-3 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    {/* Heading font to Nourd, text to green-1 */}
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-1 font-nourd">
                        Log in to Your GoTalent NG Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        // Error message background to beige-1, border to beige-1, text to black
                        <div className="bg-beige-1 border border-beige-1 text-black px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {/* Remove resetMessage display */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                // Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue, focus border to blue
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-beige-2 placeholder-beige-1 text-green-1 rounded-t-md focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                // Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue, focus border to blue
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-beige-2 placeholder-beige-1 text-green-1 rounded-b-md focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Forgot Password Link - NOW A LINK TO THE NEW PAGE */}
                        <div className="text-sm">
                            {/* Link text to blue, hover text to green-1 */}
                            <Link to="/forgot-password" className="font-medium text-blue hover:text-green-1">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            // Button background to blue, text to custom white, hover background to green-1, focus ring to blue
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-green-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                // Spinner color to custom white
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center mt-4">
                    Don't have an account? {/* Link text to blue, hover text to green-1 */}
                    <Link to="/register" className="font-medium text-blue hover:text-green-1">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
