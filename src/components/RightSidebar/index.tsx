import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

export default function RightSidebar() {
  const [expanded, setExpanded] = useState(false); 

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleExpand}
      className={`fixed right-0 top-0 h-screen bg-[#fafafa] transition-all border-r border border-gray-200 ${
        expanded ? "w-[400px] px-8" : "w-[60px] px-2"
      }`}
    >
      {expanded ? (
        <div className="flex flex-col justify-center h-full">
          {/* Konten yang akan ditampilkan ketika expanded */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-x-3 bg-[#f1f5f9] p-4">
              <div className="text-[18px] font-medium p-2 bg-white">Subscribe</div>
              <div className="text-[18px] font-medium p-1">Redem</div>
              <div className="text-[18px] font-medium p-1">Switch</div>
            </div>

            <div className="flex gap-x-3 bg-[#f1f5f9] p-4">
              <div className="text-[18px] font-medium p-2 bg-white">Share Assets Class</div>
              <div className="text-[18px] font-medium p-1">In-Kind</div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Amount</h3>
            <div className="relative w-full h-max">
              <input
                type="text"
                className="w-full p-1 rounded outline outline-gray-200"
                onClick={stopPropagation}
              />
              <span className="absolute right-0 bg-[#f1f5f9] p-1">USDC</span>
            </div>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="">Balance</span>
              <span className="">999 USDC</span>
            </h3>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Terms</h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Lock-up Period</span>
              <span className="">24 hours</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Minimum Investment</span>
              <span className="">1,000 USDC</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Maximum Investment</span>
              <span className="">10,000 USDC</span>
            </h3>
          </div>

          <div className="flex flex-col gap-2 pb-6 mt-10 border-b border-gray-200">
            <h3 className="mb-2 text-lg font-medium text-black">Summary</h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Latest NAV</span>
              <span className="">100.0</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Subscription Fees</span>
              <span className="">(0%) 0</span>
            </h3>
            <h3 className="flex justify-between mb-2 text-lg font-medium text-black">
              <span className="mr-5">Approx. Subscription Amount</span>
              <span className="">GBS 123.45</span>
            </h3>
          </div>

          <div className="flex gap-6 mt-5">
            <button className="p-4 text-black bg-[#f1f5f9]">clear</button>
            <button className="w-full p-4 text-center text-white bg-green-500">
              Subscribe 1,000 USDC
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <RefreshCcw size={20} />
        </div>
      )}
    </div>
  );
}
