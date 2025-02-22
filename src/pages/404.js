import React from 'react';

const NoMatch = () => {
  return (
    <div className="flex flex-col bg-white pt-16 pb-12">
      <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-9xl font-bold uppercase tracking-wide">
              4<span className="font-bold text-primary">0</span>4
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Page non trouvée
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
