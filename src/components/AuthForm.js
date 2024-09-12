import React from 'react';

const AuthForm = ({ children }) => {
  return (
    <div className="bg-gray-900 bg-opacity-75 rounded-lg shadow-lg relative text-center p-8 w-full max-w-md">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-pink rounded-t-lg"></div>
      <h1 className="text-4xl font-bold text-white mb-8">
        <span className="text-white">FLIX</span>
        <span className="text-pink-500">GO</span>
      </h1>
      {children}
    </div>
  );
};

export default AuthForm;
