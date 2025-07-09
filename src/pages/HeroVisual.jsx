import React from 'react';

const HeroVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-0">
      {/* Background shape/gradient (optional, for visual interest) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-20 rounded-full blur-3xl scale-125"></div>

      <div className="relative z-10 flex flex-wrap justify-center gap-6 lg:gap-8">
        {/* Card 1 */}
        <div className="group relative w-40 h-40 md:w-48 md:h-48 transform -rotate-6 hover:rotate-0 transition-transform duration-300 ease-in-out cursor-pointer
                    bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
            <img
              src="src/assets/profile2.png" // Placeholder for a professional person
              alt="Talent A"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent text-white text-center text-xs md:text-sm font-semibold">
              <p>Product Designer</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative w-40 h-40 md:w-48 md:h-48 transform rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out cursor-pointer
                    bg-gradient-to-br from-green-500 to-teal-500 p-0.5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
            <img
              src="src/assets/profile1.png" // Placeholder for another professional
              alt="Talent B"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
             <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent text-white text-center text-xs md:text-sm font-semibold">
              <p>Software Engineer</p>
            </div>
          </div>
        </div>

        {/* Card 3 (Optional - if you want three cards) */}
        {/*
        <div className="group relative w-40 h-40 md:w-48 md:h-48 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-in-out cursor-pointer
                    bg-gradient-to-br from-orange-500 to-red-500 p-0.5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
            <img
              src="https://via.placeholder.com/400x400/e67e22/ffffff?text=Talent+C"
              alt="Talent C"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
             <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent text-white text-center text-xs md:text-sm font-semibold">
              <p>Marketing Specialist</p>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default HeroVisual;