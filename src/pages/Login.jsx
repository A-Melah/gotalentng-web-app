import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config'; // Import auth
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import the new function

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false); // New state for reset button loading
    const [resetMessage, setResetMessage] = useState(''); // New state for reset feedback
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setResetMessage(''); // Clear any reset messages on login attempt
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

    const handlePasswordReset = async () => {
        setError(''); // Clear login errors
        setResetMessage(''); // Clear previous messages
        if (!email) {
            setError('Please enter your email address to reset your password.');
            return;
        }

        setIsResetting(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage('Password reset email sent! Please check your inbox.');
            console.log('Password reset email sent to:', email);
        } catch (err) {
            console.error("Firebase password reset error:", err);
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('The email address is not valid.');
                    break;
                case 'auth/user-not-found':
                    setError('There is no user corresponding to this email address.');
                    break;
                default:
                    setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to Your GoTalent NG Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {/* Display login error */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {/* Display password reset message */}
                    {resetMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{resetMessage}</span>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading || isResetting}
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isResetting}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Forgot Password Link */}
                        <div className="text-sm">
                            <button
                                type="button" // Use type="button" to prevent form submission
                                onClick={handlePasswordReset}
                                disabled={isResetting || isLoading}
                                className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isResetting ? 'Sending...' : 'Forgot your password?'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading || isResetting}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center mt-4"> {/* Added mt-4 for spacing */}
                    Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;