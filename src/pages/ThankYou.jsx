import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl w-full text-center border border-gray-200 shadow-lg p-10 rounded-2xl">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Thanks for reaching out! We've received your submission and will follow up as soon as possible
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-800 transition duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
