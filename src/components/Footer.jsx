import React, { useState } from "react";

const Footer = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data?.arAddress) {
      navigator.clipboard.writeText(data.arAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="absolute bottom-0 w-full flex">
      <div className="flex justify-between flex-col items-end py-2 px-4 mx-12 flex-grow mb-2 text-sm">
        <p className="text-black text-center">Bidify Mint@2.1.2</p>
        {data && (
          <div className="flex flex-col items-end gap-1">
            <a
              href={`https://viewblock.io/arweave/address/${data.arAddress}`}
              target="_blank"
              rel="noreferrer"
              className="text-black text-center hover:underline"
              title="View on Viewblock"
            >
              {data.arAddress}
            </a>
            <span className="text-black text-xs">
              {Number(data.balanceInAr).toFixed(4)} AR
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              {copied ? "✓ Copied!" : "Copy address"}
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
