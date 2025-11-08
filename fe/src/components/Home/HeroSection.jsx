import { Pyramid, RefreshCcwDotIcon, TruckIcon, UserRoundCheckIcon } from "lucide-react";
import FloatingGrid from "./FramerGrid";

const HeroSection = () => {
    return (
        <section className="h-screen max-w-screen my-1">
            <div className="h-[85%] bg-gradient-to-br from-[#d4e6fa] to-[white] flex gap-2 justify-center">
                <div className="w-[600px]  flex  justify-center flex-col px-5 gap-4">
                    <div>
                        <h1 className="text-6xl font-bold">Find Your next <span className="text-blue-400">favorite</span> book</h1>
                    </div>
                    <div>
                        <p className="text-gray-600 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quod vitae eligendi minus iste nostrum?</p>
                    </div>
                    <div className="button flex gap-2">
                        <button className="bg-yellow-500 px-5 py-3 rounded-[17px] text-white font-semibold">Shop Bestsellers</button>
                        <button className="bg-transperent px-5 py-3 rounded-[17px] text-blue-500 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold ">Browse Categories</button>
                    </div>
                    <div className="flex gap-2">
                        <p className="flex gap-1 items-center"><span className="text-green-500"><TruckIcon size={18} /></span>Free Shipping over ₹999</p>
                        <p className="flex gap-1 items-center"><span className="text-green-500"><RefreshCcwDotIcon size={18} /></span>Free Shipping over ₹999</p>
                    </div>
                </div>
                <div className="w-[600px] h-full  relative">
                    <FloatingGrid />
                </div>
            </div>
            <div className="h-[25%] bg-blue-50 flex gap-6 items-center justify-center p-6">
                <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2  py-1" >
                    <p> <span className="text-green-500 text-center"><TruckIcon size={30} /></span></p>
                    <h2 className="font-bold text-xl">Free Shipping</h2>
                    <p className="font-semibold text-xl">On orders over ₹900</p>
                </div>
                <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2  py-1" >
                    <p> <span className="text-green-500 text-center"><RefreshCcwDotIcon size={30} /></span></p>
                    <h2 className="font-bold text-xl">Easy Returns</h2>
                    <p className="font-normal text-xl">7-day hassle-free returns</p>
                </div>
                <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2  py-1" >
                    <p> <span className="text-green-500 text-center"><Pyramid size={30} /></span></p>
                    <h2 className="font-bold text-xl">Secure Payments</h2>
                    <p className="font-semibold text-xl">SSL encrypted transactions</p>
                </div>
                <div className="w-[240px] h-[170px] bg-white rounded-2xl flex flex-col justify-center items-center gap-2  py-1" >
                    <p> <span className="text-green-500 text-center"><UserRoundCheckIcon size={30} /></span></p>
                    <h2 className="font-bold text-xl">24/7 Support</h2>
                    <p className="font-semibold text-xl">Round-the-clock assistant</p>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
