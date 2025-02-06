import React from 'react'

import { Search, ShoppingCart } from "lucide-react";
import Support from './Support';

const Navbar = () => {
    return (
        <div className="border-b">
            <Support />
            <div className="flex justify-between items-center px-6 py-3">

                <h1 className="text-2xl font-bold">ECOMMERCE</h1>


                <nav className="hidden md:flex space-x-6 font-semibold text-gray-900 ">
                    <a href="#" className="hover:text-black">Categories</a>
                    <a href="#" className="hover:text-black">Sale</a>
                    <a href="#" className="hover:text-black">Clearance</a>
                    <a href="#" className="hover:text-black">New stock</a>
                    <a href="#" className="hover:text-black">Trending</a>
                </nav>

                <div className="flex items-center space-x-6 text-gray-700">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <ShoppingCart className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            <div className="bg-gray-100 text-center py-2 text-sm flex justify-center items-center">
                <button className="px-2">‹</button>
                <span>Get 10% off on business sign up</span>
                <button className="px-2">›</button>
            </div>
        </div>
    );
};

export default Navbar;

