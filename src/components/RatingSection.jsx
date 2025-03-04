import React from 'react';

const RatingSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Your Rating</h2>
      <p className="text-sm text-gray-500 mb-2">Lorem ipsum dolor sit amet, consectetur</p>
      <div className="flex justify-center items-center space-x-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center text-purple-800">85%</div>
          <p className="mt-2 text-sm">Hygiene</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center text-orange-800">85%</div>
          <p className="mt-2 text-sm">Food Taste</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">92%</div>
          <p className="mt-2 text-sm">Packaging</p>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;