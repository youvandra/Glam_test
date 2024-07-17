/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Combine,
  Layers3,
  ArrowUp,
  Command,
  Text,
  BriefcaseBusiness,
  Pin,
  Plus,
  Star,
  ChevronUp,
} from "lucide-react";

export default function LeftSidebar() {
  const [expanded, setExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const truncateWalletAddress = (address: string | null, maxLength: number = 10) => {
    if (!address) return "";
    if (address.length <= maxLength) return address;
    return address.slice(0, maxLength) + "..." + address.slice(-3);
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfWalletIsConnected();
  }, []);


  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={handleExpand}
      className={`relative h-screen bg-[#fafafa] transition-all  border-r border border-gray-200 ${
        expanded ? "w-[320px]" : "w-0 px-10"
      }`}
    >
      {expanded ? (
        <div className={`flex flex-col py-5 gap-y-3`}>
          {/*  */}
          <div className="px-5">
            <h4 className="text-2xl font-light text-gray-600">GLAM *.+</h4>
          </div>
          {/*  */}
          <div className="py-6 mt-5 border border-gray-200 bg-[#f4f4f5]">
            <div className="px-5 space-y-3 ">
              <div className="flex items-center justify-between text-xl font-normal text-gray-600">
                <div className="flex gap-x-2">
                  <Layers3 className="text-lg" />
                  Screener
                </div>
                <div className="flex gap-2">
                  <ArrowUp size={14} />
                  <Command size={14} />
                  <Text size={14} />
                </div>
              </div>
              <div className="flex items-center justify-between text-xl font-normal text-gray-600">
                <div className="flex gap-x-2">
                  <Combine className="text-lg" />
                  Portofolio
                </div>
                <div className="flex gap-2">
                  <ArrowUp size={14} />
                  <Command size={14} />
                  <Text size={14} />
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-5">
            <div className="flex flex-col gap-y-4">
              {Array.from({ length: 6 }, (_, i) => i).map((i) => {
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex gap-3 text-xl font-normal">
                      <img
                        src="/assets/IBTC.png"
                        alt=""
                        className="size-[30px]"
                      />
                      IBTC
                    </div>
                    {i == 0 && (
                      <div className="flex items-center text-gray-300 gap-x-3">
                        <BriefcaseBusiness size={20} />
                        <Pin className="rotate-45" size={20} fill="gray" />
                      </div>
                    )}
                    {i == 1 && (
                      <Star size={20} className="text-gray-400" fill="gray" />
                    )}
                  </div>
                );
              })}
              {/*  */}
              <div className="flex items-center text-xl text-gray-600">
                <Plus className="mr-5" size={18} />
                Create Product
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start w-full py-5 gap-y-3">
          <div className="text-2xl text-gray-400">*.+</div>
          <Layers3 size={24} className="text-gray-400" />
        </div>
      )}
      {/*  */}

      {expanded ? (
        <div className={`absolute bottom-0 left-0 w-full`}>
          <div className="px-2 py-4 border border-gray-200">
            <div className="flex items-center justify-between px-4 py-4 border border-gray-200 rounded-sm">
              <div className="flex gap-3 text-xl font-normal">
                <img src="/assets/IBTC.png" alt="" className="size-[30px]" />
                {truncateWalletAddress(walletAddress)}
              </div>
              <ChevronUp size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 w-full p-4 border border-bgray-200">
          <img src="/assets/IBTC.png" alt="" className="size-[30px]" />
        </div>
      )}
    </div>
  );
}
