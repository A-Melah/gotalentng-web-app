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
    // Apply Poppins globally to the page, background to beige-3
    <div className="min-h-screen flex flex-col items-center justify-center bg-beige-3 px-6 py-16 font-poppins">
      {/* Card background to custom white, border to beige-2 */}
      <div className="max-w-xl w-full text-center border border-beige-2 shadow-lg p-10 rounded-2xl bg-white">
        {/* Heading font to Nourd, text to blue */}
        <h1 className="text-4xl font-bold text-blue mb-4 font-nourd">Thank You!</h1>
        {/* Paragraph text to green-1 */}
        <p className="text-green-1 text-lg mb-6">{message}</p>
        <Link
          to="/"
          // Button background to blue, text to custom white, hover background to green-1
          className="inline-block bg-blue text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-1 transition duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
