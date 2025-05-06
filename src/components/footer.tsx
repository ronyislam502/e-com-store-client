import { FacebookIcon, TwitterIcon } from "./icons";
import { siteConfig } from "../config/site";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white  dark:bg-white dark:text-black py-12 items-center text-center">
      <div className="lg:px-40 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:place-items-center ">
        {/* Section 1: About Us */}
        <div className="">
          <h2 className="text-2xl font-bold text-primary">E-com</h2>
          <p className="text-sm text-dark py-2 dark:text-black">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit
            amet, consectetur adipisicing elit.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="">
          <h2 className="text-lg font-bold text-primary">Quick Links</h2>
          <ul className=" text-sm text-dark dark:text-black">
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
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-primary">Stay Connected</h2>
          <p className="text-sm text-dark dark:text-black">
            Follow us on social media and never miss an update!
          </p>
          <div className="flex space-x-2 text-3xl items-center text-center px-36">
            <FacebookIcon />
            <TwitterIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
