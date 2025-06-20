import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThankYou = () => {
  const query = new URLSearchParams(useLocation().search);
  const formType = query.get('form');

  // Map of formType → message
  const messages = {
    contact: "Thanks for reaching out! We'll respond to your inquiry as soon as possible.",
    training: "Thank you for applying for our training. Our team will contact you with the next steps.",
    talent: "Thanks for your talent request. Our recruitment team will reach out to you soon.",
  };

  const message =
    messages[formType] ||
    "Your submission has been received. We'll get back to you shortly.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl w-full text-center border border-gray-200 shadow-lg p-10 rounded-2xl">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
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
