// Footer Component (in a separate file, e.g., Footer.js)
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white pt-10 pb-6 px-6 relative z-10">
      <div className="flex flex-col items-center space-y-6">
        {/* Social Media Icons */}
        <div className="grid grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 w-12 h-12 flex items-center justify-center rounded-lg"
            >
              <img
                src="/assets/diambra/twitch.png"
                alt="Twitch"
                className="w-6 h-6"
              />
            </div>
          ))}
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 text-gray-400">
          <Link to="/join-us">Join Us</Link>
          <Link to="/environments">Environments</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/about">About</Link>
          <Link to="/research">Research Collaborations</Link>
          <Link to="/host">Host your Competition</Link>
          <Link to="/games">Games</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/sponsor">Become Sponsor / Investor</Link>
        </div>

        {/* Logo Section */}
        <div className="text-center">
          <p className="text-gray-600 font-spatialBlack text-3xl lg:text-[8rem]">DIAMBRA <span className="text-[#EDBB17]">AI</span></p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-x-4 text-sm text-gray-400">
          <Link to="/terms">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookie Policy</Link>
          <p>DIAMBRA, Inc. © Copyright 2018 - 2024. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;