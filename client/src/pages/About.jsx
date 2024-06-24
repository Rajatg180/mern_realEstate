import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About Our Real Estate Marketplace</h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          Welcome to our cutting-edge real estate marketplace, where you can find, list, and manage properties with ease. Built with the latest technologies, our platform offers a seamless experience for both buyers and sellers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Create, edit, and manage property listings</li>
              <li>Advanced search functionality with filters</li>
              <li>Contact property owners directly</li>
              <li>OAuth and JWT authentication for secure access</li>
              <li>Responsive design for all devices</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>MERN Stack (MongoDB, Express.js, React, Node.js)</li>
              <li>Firebase for OAuth and storage</li>
              <li>Redux Toolkit for state management</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
