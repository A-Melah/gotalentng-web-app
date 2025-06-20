import React from 'react';

const ThankYou = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Thank You!</h1>
      <p className="text-lg text-green-700 mb-6">Your message has been received. We’ll get back to you soon.</p>
      <a href="/" className="text-green-600 underline">Return to homepage</a>
    </div>
  </div>
);

export default ThankYou;
