import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold mt-4">John Doe</h2>
          <p className="text-gray-600">Software Engineer</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">About Me</h3>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <ul className="text-gray-700 mt-2">
            <li>Email: john.doe@example.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Location: San Francisco, CA</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;