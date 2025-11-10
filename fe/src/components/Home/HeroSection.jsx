import { Pyramid, RefreshCcwDotIcon, TruckIcon, UserRoundCheckIcon } from "lucide-react";
import FloatingGrid from "./FramerGrid";

const HeroSection = () => {
    return (
        <section className="w-full h-screen bg-gradient-to-br from-[#d4e6fa] to-white py-20">
            
            {/* TOP HERO */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 gap-10">
                
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-5 max-w-xl">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Find Your next <span className="text-blue-400">favorite</span> book
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quod vitae
                        eligendi minus iste nostrum?
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-yellow-500 px-5 py-3 rounded-[17px] text-white font-semibold hover:bg-yellow-600">
                            Shop Bestsellers
                        </button>
                        <button className="bg-transparent px-5 py-3 rounded-[17px] text-blue-500 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold">
                            Browse Categories
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                        <p className="flex gap-1 items-center">
                            <span className="text-green-500"><TruckIcon size={18} /></span>
                            Free Shipping over ₹999
                        </p>
                        <p className="flex gap-1 items-center">
                            <span className="text-green-500"><RefreshCcwDotIcon size={18} /></span>
                            7-day Easy Returns
                        </p>
                    </div>
                </div>

                {/* RIGHT GRID */}
                <div className="w-full md:w-[900px] h-[400px] relative">
                    <FloatingGrid />
                </div>
            </div>

            {/* BOTTOM FEATURES */}
            <div className="bg-blue-50 w-full py-10">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">

                    <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2 shadow">
                        <span className="text-green-500"><TruckIcon size={30} /></span>
                        <h2 className="font-bold text-xl">Free Shipping</h2>
                        <p className="font-semibold text-xl">On orders over ₹900</p>
                    </div>

                    <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2 shadow">
                        <span className="text-green-500"><RefreshCcwDotIcon size={30} /></span>
                        <h2 className="font-bold text-xl">Easy Returns</h2>
                        <p className="font-normal text-xl">7-day hassle-free returns</p>
                    </div>

                    <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2 shadow">
                        <span className="text-green-500"><Pyramid size={30} /></span>
                        <h2 className="font-bold text-xl">Secure Payments</h2>
                        <p className="font-semibold text-xl">SSL encrypted transactions</p>
                    </div>

                    <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2 shadow">
                        <span className="text-green-500"><UserRoundCheckIcon size={30} /></span>
                        <h2 className="font-bold text-xl">24/7 Support</h2>
                        <p className="font-semibold text-xl">Round-the-clock assistant</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
