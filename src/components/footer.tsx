import React from "react";
import { FacebookIcon, TwitterIcon } from "./icons";
import { siteConfig } from "../config/site";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-dark-100 bg-secondary-400 text-dark dark:text-white py-12">
      <div className="lg:px-40 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:place-items-center ">
        {/* Section 1: About Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Ultimate Tripz</h2>
          <p className="text-sm text-dark dark:text-white">
            Welcome to Ultimate Tripz! We are a community of passionate
            travelers sharing tips, guides, and personal stories to help you
            plan unforgettable journeys. Discover new destinations, and connect
            with fellow explorers!
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-primary">Quick Links</h2>
          <ul className="space-y-2 text-sm text-dark dark:text-white">
            {siteConfig?.navItems?.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section 3: Stay Connected */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-primary">Stay Connected</h2>
          <p className="text-sm text-dark dark:text-white">
            Follow us on social media and never miss an update!
          </p>
          <div className="flex space-x-4 text-3xl">
            <FacebookIcon />
            <TwitterIcon />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-dark dark:text-white">
        <p>&copy; 2024 Ultimate Tripz. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
