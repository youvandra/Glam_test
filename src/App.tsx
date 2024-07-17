import { Star, ChevronDown, ChevronUp } from "lucide-react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import PerformanceChart from "./components/Perfor";

function App() {
  return (
    <div className="h-full overflow-x-hidden bg-white">
      <div className="flex">
        <LeftSidebar />
        <div className="flex-grow">
          <div className="flex justify-center">
            <div className="max-w-[1600px] w-full">
              {/* Main content */}
              <main className="p-5">
                {/* Breadcrumb */}
                <div className="flex justify-between mb-5">
                  <div className="text-xl text-gray-900">Screener {" > "} GBS</div>
                  <div className="p-3 border border-gray-400">
                    <Star size={16} className="" />
                  </div>
                </div>

                {/* Content section 1 */}
                <div className="flex gap-x-6 mt-[70px]">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-x-6">
                      <img
                        src="/assets/IBTC.png"
                        className="size-[120px] aspect-square"
                        alt=""
                      />
                      <div className="bg-[#f3f3f3] p-8">
                        <h3 className="text-xl font-semibold text-black">
                          GLAM Investment Fund
                        </h3>
                        <h6 className="text-lg font-normal text-gray-600">
                          GLAM Investment Fund seek to reflect generally performance
                          of bitcoin and solana
                        </h6>
                      </div>
                    </div>

                    {/* Additional content */}
                    <div className="flex gap-x-6">
                      <div className="bg-[#f3f3f3] px-8 py-5 text-start flex flex-col gap-2">
                        <h3 className="text-lg font-normal text-gray-600">Symbol</h3>
                        <h3 className="text-xl font-semibold text-black">GBS</h3>
                        <h3 className="text-sm font-normal text-gray-600">
                          Cpr..iN1
                        </h3>
                      </div>

                      <div className="bg-[#f3f3f3] px-8 py-5 text-start flex flex-col gap-2">
                        <h3 className="text-lg font-normal text-gray-600">
                          Share Assets
                        </h3>
                        <h3 className="text-xl font-semibold text-black">USDC</h3>
                        <h3 className="text-sm font-normal text-gray-600">
                          EPj..t1v
                        </h3>
                      </div>

                      <div className="bg-[#f3f3f3] px-8 py-5 text-start flex flex-col gap-5">
                        <h4 className="text-xl text-gray-600">Fees</h4>
                        <div className="flex justify-between gap-x-10">
                          <h4 className="flex text-xl text-gray-600">
                            <span className="block mr-10">Management</span>
                            <span className="block ml-0 font-medium text-black">
                              1.5%
                            </span>
                          </h4>
                          <h4 className="flex text-xl text-gray-600">
                            <span className="block mr-10">Subscription</span>
                            <span className="block ml-0 font-medium text-black">
                              0%
                            </span>
                          </h4>
                        </div>

                        <div className="flex justify-between gap-x-10">
                          <h4 className="flex text-xl text-gray-600">
                            <span className="block mr-10">Performance</span>
                            <span className="block ml-0 font-medium text-black">
                              10%
                            </span>
                          </h4>
                          <h4 className="flex text-xl text-gray-600">
                            <span className="block mr-10">Redemption</span>
                            <span className="block ml-0 font-medium text-black">
                              0%
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional content */}
                  <div className="flex gap-x-5">
                    <div className="p-7 bg-[#f3f3f3] flex flex-col gap-y-5">
                      <h4 className="font-medium text-gray-700 text-start">NAV</h4>
                      <h4 className="text-[60px] text-black">100.00</h4>
                      <h4 className="text-lg text-gray-400">1 days NAV change</h4>
                      <h4 className="flex items-center text-lg text-green-500">
                        <ChevronUp size={14} />
                        <span className="ml-4">1.00 (1.00%)</span>
                      </h4>
                    </div>

                    <div className="p-7 bg-[#f3f3f3] flex flex-col gap-y-5">
                      <h4 className="font-medium text-gray-700 text-start">AUM</h4>
                      <h4 className="text-[60px] text-black">21.0M</h4>
                      <h4 className="text-lg text-gray-400">1 days AUM change</h4>
                      <h4 className="flex items-center text-lg text-red-500">
                        <ChevronDown size={14} />
                        <span className="ml-4">1M (0.42%)</span>
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Content section 2 */}
                <div className="mt-[100px]">
                  <div className="p-3 border-[5px] border-[#f1f5f9] w-max mb-4">
                    Overview
                  </div>
                  <div className="flex gap-x-6">
                    <div className="flex flex-col  bg-[#f3f3f3] max-w-[1200px] p-5">
                      <h4 className="my-5 text-xl font-medium">Performance</h4>
                      <PerformanceChart/>
                    </div>

                    <div className="flex flex-col  bg-[#f3f3f3] w-full max-w-[400px] p-5">
                      <div className="pb-4 border-b border-gray-200">
                        <h4 className="my-5 text-xl font-medium">Key facts</h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Share Class Assets</span>
                          <span className="inline-block">USDC</span>
                        </h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Inception Date</span>
                          <span className="inline-block">2024-04-01</span>
                        </h4>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <h4 className="my-5 text-xl font-medium">Accounts</h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Fund</span>
                          <span className="inline-block">Adxk..4hdh</span>
                        </h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Treasury</span>
                          <span className="inline-block">7Eo2..k6ys</span>
                        </h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Manager</span>
                          <span className="inline-block">ema1..k7t7s</span>
                        </h4>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <h4 className="my-5 text-xl font-medium">Terms</h4>
                        <h4 className="flex items-center justify-between text-lg font-normal">
                          <span className="inline-block">Lock-up Period</span>
                          <span className="inline-block">24 hours</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
