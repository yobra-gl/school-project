// Hero.js
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-900">
    <section className=" mx-auto max-w-screen-xl h-170 pt-12 pb-12 px-4 items-center lg:flex md:px-8">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            Find Your Dream Car Today with  
            <span className="text-indigo-400"> Class & Style</span>
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            We make you drive classy with a smooth, effortless car rental experience.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <a
              href="javascript:void(0)"
              className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
            >
              Explore Cars
            </a>
            <a
              href="javascript:void(0)"
              className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
            >
              Browse Collection
            </a>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="https://i.imgur.com/tmmSn07.png"
            className="w-full mx-auto sm:w-10/12 lg:w-full"
            alt="Dream Car"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
