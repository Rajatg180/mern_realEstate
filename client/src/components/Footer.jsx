import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaGithub,FaMedium } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-20">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-3">EstateEase</h3>
            <p className="text-gray-400">Find your dream home with us. We offer the best listings and comprehensive information for all your real estate needs.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-400 hover:text-gray-200">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/search" className="text-gray-400 hover:text-gray-200">Listings</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-gray-400 hover:text-gray-200">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-gray-200">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">123 Real Estate St, Suite 100<br />City, State, 12345</p>
            <p className="text-gray-400 mt-2">Email: info@realestateapp.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            {/* Social Icons */}
            <div className="flex mt-4">
              <Link to="https://github.com/Rajatg180" className="text-gray-400 hover:text-white mr-4">
                <FaGithub size="1.5em" />
              </Link>
              <Link to="https://www.linkedin.com/in/rajat-gore-098088228/" className="text-gray-400 hover:text-white mr-4">
                <FaLinkedin size="1.5em" />
              </Link>
              <Link to="x.com" className="text-gray-400 hover:text-white mr-4">
                <FaTwitter size="1.5em" />
              </Link>
              <Link to="https://medium.com/@rajatgore1803" className="text-gray-400 hover:text-white mr-4">
                <FaMedium size="1.5em" />
              </Link>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} EstateEase. All rights reserved.</p>
          <p>Made with ❤ By Rajat Gore</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;