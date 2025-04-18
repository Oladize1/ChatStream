import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-7xl font-bold text-error">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist. It may have been moved or deleted.
      </p>
      <Link to="/" className="mt-6">
        <button className="btn btn-primary btn-wide">
          🔙 Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
