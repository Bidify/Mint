import React from "react";

const Footer = ({ data }) => {
  return (
    <footer className="absolute bottom-0 w-full flex">
      <div className="flex justify-between flex-col items-end py-2 px-4 mx-12 flex-grow mb-2 text-sm">
        <p className="text-black text-center">Bidify Mint@2.1.0</p>
        {data && (
          <a
            href={`https://viewblock.io/arweave/address/${data.arAddress}`}
            target="_blank"
            rel="noreferrer"
            className="text-black text-center"
          >
            {`${data.arAddress.slice(0, 6)}...${data.arAddress.slice(-6)}`} :{" "}
            {Number(data.balanceInAr).toFixed(3)} AR
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;
