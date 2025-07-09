import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config'; // Import your auth instance
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        if (!email) {
            setError('Please enter your email address.');
            setIsLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('A password reset link has been sent to your email. You will be redirected to the login page shortly.');
            console.log('Password reset email sent to:', email);

            // Redirect to login page after a delay
            setTimeout(() => {
                navigate('/login');
            }, 3000); // 3-second delay for the user to read the message

        } catch (err) {
            console.error("Firebase password reset error:", err);
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('The email address is not valid.');
                    break;
                case 'auth/user-not-found':
                    setError('There is no user registered with this email address.');
                    break;
                default:
                    setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Apply Poppins globally to the page, background to beige-3
        <div className="flex items-center justify-center min-h-screen bg-beige-3 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    {/* Heading font to Nourd, text to green-1 */}
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-1 font-nourd">
                        Forgot Your Password?
                    </h2>
                    {/* Paragraph text to green-1 */}
                    <p className="mt-2 text-center text-sm text-green-1">
                        Enter your email to receive a password reset link.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
                    {error && (
                        // Error message background to beige-1, border to beige-1, text to black
                        <div className="bg-beige-1 border border-beige-1 text-black px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {message && (
                        // Success message background to green-3, border to green-3, text to green-1
                        <div className="bg-green-3 border border-green-3 text-green-1 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{message}</span>
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
                                // Input border to beige-2, placeholder to beige-1, text to green-1, focus ring to blue, focus border to blue
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-beige-2 placeholder-beige-1 text-green-1 focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
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
                            {isLoading ? 'Sending Link...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center mt-4">
                    {/* Link text to blue, hover text to green-1 */}
                    <Link to="/login" className="font-medium text-blue hover:text-green-1">
                        &larr; Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
