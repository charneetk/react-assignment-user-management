import React, {  } from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to UserManager</h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage your users with ease. View, add, and edit user details in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
