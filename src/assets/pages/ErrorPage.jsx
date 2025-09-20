import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ status = 404, message = "Page Not Found" }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">{status}</h1>
        <p className="text-xl text-gray-600 mb-6">{message}</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
