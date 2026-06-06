import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import bidifyLogo from "../assets/images/bidify.png";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Fixed header */}
      <div className="fixed w-full flex justify-between py-1 px-4 items-center shadow-xl z-[999999] bg-[#0000003d] backdrop-filter backdrop-blur-[8px]">
        <Link to="/">
          <img
            className="max-h-[40px] sm:max-h-[75px]"
            src={bidifyLogo}
            alt="Bidify"
          />
        </Link>
        <div className="flex gap-0 my-0 sm:my-3 sm:gap-4">
          <ConnectButton />
        </div>
      </div>

      {/* Page content */}
      <div className="pt-16 sm:pt-20">
        {children}
      </div>
    </div>
  );
};

export default Layout;
