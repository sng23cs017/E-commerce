import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
    const [cartShow, setCartShow] = useState(false);
    const [wishlistShow, setWishlistShow] = useState(false);

    const changeCart = () => {
        setCartShow((prev) => !prev);
    };

    const changeWishlist = () => {
        setWishlistShow((prev) => !prev);
    };

    const {
        tempProductResult,
        productFilter,
        category,
        handleChange,
        searchValue,
        clearData,
        searchBar,
        showSearchBar,
        addToCart,
        cart,
        wishlist,
        addToWishlist,
        productCount,
        removeFromCart,
    } = useContext(ProductContext);

    return (
        <div className="max-w-[1640px] mx-auto border-[5px] border-[#f0f0f0] min-h-screen mb-10 overflow-hidden relative">
            {/* Header */}
            <div className="w-full py-4 md:h-[100px] flex flex-wrap justify-between items-center px-4 md:px-10 gap-4">
                <div className="w-auto h-full flex justify-center items-center">
                    <p className="text-3xl font-bold text-[#b34141]">Shop</p>
                </div>

                {searchBar && (
                    <div className="w-full md:w-[500px] h-10 md:h-8 border-[1px] border-[grey] rounded-md px-2 py-1 relative order-last md:order-none">
                        <input
                            type="text"
                            placeholder="search by name"
                            className="w-full h-full outline-none bg-transparent "
                            value={searchValue}
                            onChange={handleChange}
                        />
                        {searchValue && (
                            <img
                                src="https://logowik.com/content/uploads/images/close1437.jpg"
                                alt=""
                                style={{ width: 22, height: 22 }}
                                className="absolute top-2 md:top-1 right-2 cursor-pointer"
                                onClick={clearData}
                            />
                        )}
                    </div>
                )}
                <div className="w-auto gap-4 md:w-[200px] h-full flex justify-between items-center ">
                    <IoMdSearch size={25} className="cursor-pointer" onClick={showSearchBar} />
                    <AiOutlineShopping size={25} className="cursor-pointer" onClick={changeCart} />
                    <Link to="/notifications">
                        <FaRegBell size={25} className="cursor-pointer" />
                    </Link>
                    <MdOutlineFavoriteBorder size={25} className="cursor-pointer" onClick={changeWishlist} />
                </div>
            </div>

            {/* Category Filter */}
            <div className="w-full px-4 md:px-10 mb-5 overflow-x-auto hide-scrollbar">
                <div className="w-full border-y-[1px] border-[#a7a0a0] flex md:justify-center">
                    <div className="min-w-max md:w-[700px] py-3 flex gap-6 md:gap-0 md:justify-between items-center text-sm md:text-base">
                        <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("All Category")}>
                            ALL CATEGORY
                        </p>
                        <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("men's clothing")}>
                            MEN'S CLOTHING
                        </p>
                        <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("jewelery")}>
                            JEWELERY
                        </p>
                        <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("electronics")}>
                            ELECTRONICS
                        </p>
                        <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("women's clothing")}>
                            WOMEN'S CLOTHING
                        </p>
                    </div>
                </div>
            </div>

            {/* ==== cart ====   */}
            <div
                className={
                    cartShow
                        ? "fixed top-0 right-0 w-full sm:w-[450px] h-screen bg-[#f8f9fa] z-30 duration-300 shadow-2xl flex flex-col sm:rounded-l-2xl border-l border-gray-200"
                        : "fixed top-0 right-[-100%] w-full sm:w-[450px] h-screen bg-[#f8f9fa] z-30 duration-300 flex flex-col sm:rounded-l-2xl border-l border-gray-200"
                }
            >
                <div className="w-full px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white sm:rounded-tl-2xl shrink-0">
                    <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <AiOutlineShopping size={28} className="text-[#b34141]"/> Cart
                        <span className="text-sm font-normal text-white bg-[#b34141] rounded-full px-2 py-0.5 ml-2">{cart.length}</span>
                    </p>
                    <RxCross2 size={24} className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors" onClick={changeCart} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <AiOutlineShopping size={80} className="text-gray-300" />
                            <p className="text-xl font-medium">Your cart is empty</p>
                            <button onClick={changeCart} className="mt-4 px-6 py-2 bg-[#b34141] text-white rounded-lg hover:bg-[#9c3838] transition-colors">Continue Shopping</button>
                        </div>
                    ) : (
                        cart.map((data) => (
                            <div className="w-full bg-white border border-gray-100 rounded-xl p-3 flex gap-4 shadow-sm hover:shadow-md transition-shadow relative group" key={data.id}>
                                <div className="h-24 w-24 shrink-0 bg-gray-50 rounded-lg flex justify-center items-center overflow-hidden p-2">
                                    <img src={data.image} alt="" className="object-contain h-full w-full mix-blend-multiply transition-transform group-hover:scale-105" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1 pr-6 relative">
                                    <div 
                                        className="absolute top-0 right-0 p-1 bg-gray-50 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                        onClick={() => removeFromCart(data.id)}
                                    >
                                        <RxCross2 size={16} />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-gray-800 line-clamp-1">{data.title.split(" ").slice(0,3).join(" ")}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{data.title}</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <p className="font-bold text-[#b34141]">RS {data.price}/-</p>
                                        <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                                            <button
                                                className="w-7 h-7 flex justify-center items-center rounded-md bg-white text-gray-700 hover:bg-gray-200 transition-colors shadow-sm font-medium"
                                                onClick={() => productCount(-1, data.id)}
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-gray-700">{data.qty}</span>
                                            <button
                                                className="w-7 h-7 flex justify-center items-center rounded-md bg-white text-gray-700 hover:bg-gray-200 transition-colors shadow-sm font-medium"
                                                onClick={() => productCount(1, data.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length !== 0 && (
                    <div className="w-full bg-white border-t border-gray-200 p-6 shrink-0 sm:rounded-bl-2xl">
                        <Link to="/checkout" className="block w-full">
                            <button className="w-full py-3.5 bg-[#b34141] hover:bg-[#9c3838] transition-colors rounded-xl text-white font-bold text-lg shadow-lg flex justify-center items-center gap-2">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* ==== wishlist ====   */}
            <div
                className={
                    wishlistShow
                        ? "fixed top-0 right-0 w-full sm:w-[450px] h-screen bg-[#f8f9fa] z-30 duration-300 shadow-2xl flex flex-col sm:rounded-l-2xl border-l border-gray-200"
                        : "fixed top-0 right-[-100%] w-full sm:w-[450px] h-screen bg-[#f8f9fa] z-30 duration-300 flex flex-col sm:rounded-l-2xl border-l border-gray-200"
                }
            >
                <div className="w-full px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white sm:rounded-tl-2xl shrink-0">
                    <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <MdOutlineFavoriteBorder size={28} className="text-[#b34141]"/> Wishlist
                        <span className="text-sm font-normal text-white bg-[#b34141] rounded-full px-2 py-0.5 ml-2">{wishlist.length}</span>
                    </p>
                    <RxCross2 size={24} className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors" onClick={changeWishlist} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {wishlist.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <MdOutlineFavoriteBorder size={80} className="text-gray-300" />
                            <p className="text-xl font-medium">Your wishlist is empty</p>
                            <button onClick={changeWishlist} className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">Explore Products</button>
                        </div>
                    ) : (
                        wishlist.map((data) => (
                            <div className="w-full bg-white border border-gray-100 rounded-xl p-3 flex gap-4 shadow-sm hover:shadow-md transition-shadow group" key={data.id}>
                                <div className="h-24 w-24 shrink-0 bg-gray-50 rounded-lg flex justify-center items-center overflow-hidden p-2">
                                    <img src={data.image} alt="" className="object-contain h-full w-full mix-blend-multiply transition-transform group-hover:scale-105" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <p className="text-base font-bold text-gray-800 line-clamp-1">{data.title.split(" ").slice(0,3).join(" ")}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{data.title}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-bold text-[#b34141]">RS {data.singleprice}/-</p>
                                        <button
                                            className="px-4 py-1.5 bg-gray-800 hover:bg-[#b34141] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                                            onClick={() => addToCart(data.id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Overlay for Sidebar */}
            {(cartShow || wishlistShow) && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 transition-opacity"
                    onClick={() => {
                        if(cartShow) changeCart();
                        if(wishlistShow) changeWishlist();
                    }}
                ></div>
            )}

            {/* Banner */}
            <div className="w-full h-auto md:h-[300px] px-4 md:px-10 mb-6 md:mb-0">
                <img
                    // src="https://www.insightssuccess.in/wp-content/uploads/2020/12/785054-ecommerce-istock-020119.jpg"
                    src="https://img.pikbest.com/origin/10/01/82/867pIkbEsTAIq.png!sw800"
                    alt="Ecommerce Banner"
                    className="w-full h-[150px] sm:h-[200px] md:h-[300px] rounded-lg md:rounded-xl object-cover shadow-sm"
                />
            </div>
            
            {/* Top Categories Header */}
            <div className="w-full py-4 flex flex-col md:flex-row items-start md:items-center px-4 md:px-10 justify-between gap-4 mt-6">
                <p className="text-2xl sm:text-3xl md:text-5xl text-[#857f7f] font-semibold">Our Top Categories</p>
                <div className="flex items-center">
                    <p className="mr-3 md:mr-5 font-bold text-[#353333] text-sm md:text-base">Sorted By: </p>
                    <div className="border-[1px] border-[#6b2727] w-32 md:w-36 h-8 flex justify-center items-center rounded-md text-sm md:text-base bg-white">
                        <p className="truncate px-2">{category}</p>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-10 pb-10 place-items-center mt-4">
                {tempProductResult.map((data) => (
                    <div
                        className="w-full max-w-[320px] sm:max-w-none h-[410px] border-[1px] border-[#e0e0e0] rounded-xl p-3 relative flex flex-col hover:shadow-lg transition-shadow duration-300 bg-white"
                        key={data.id}
                    >
                        <div className="w-full h-[220px] bg-[#f9f9f9] rounded-xl flex justify-center items-center relative overflow-hidden p-4">
                            <img src={data.image} alt={data.title} className="object-contain h-full w-full mix-blend-multiply" />
                            <div 
                                className="cursor-pointer absolute top-3 right-3 bg-white shadow-md rounded-full p-1.5 hover:scale-110 transition-transform"
                                onClick={() => addToWishlist(data.id)}
                            >
                                <MdOutlineFavoriteBorder size={22} className="text-red-500" />
                            </div>
                        </div>

                        <div className="mt-3 flex-1 relative">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-[18px] md:text-[22px] font-bold truncate flex-1">{data.title.split(" ")[0]}</p>
                                <p className="text-sm md:text-base text-[#b34141] font-bold whitespace-nowrap">RS {data.price}/-</p>
                            </div>
                            <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mt-1">{data.title}</p>
                        </div>
                        
                        <div
                            className="w-full h-10 bg-[#ce4848] text-white flex justify-center items-center rounded-lg cursor-pointer font-semibold hover:bg-[#b33a3a] transition-colors mt-2"
                            onClick={() => addToCart(data.id)}
                        >
                            Add To Cart
                        </div>
                    </div>
                ))}
            </div>
            {/* Footer */}
            <footer className="w-full bg-[#1a1a1a] text-white pt-12 pb-8 px-4 md:px-10 mt-10 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-[#b34141] mb-4">Shop</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your one-stop destination for all your fashion and electronic needs. Quality products, affordable prices, and fast shipping.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">Home</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">About Us</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">Contact</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">FAQs</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Categories</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("men's clothing")}>Men's Clothing</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("women's clothing")}>Women's Clothing</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("electronics")}>Electronics</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("jewelery")}>Jewelery</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 text-black rounded-l-md outline-none text-sm" />
                            <button className="bg-[#b34141] px-4 py-2 rounded-r-md hover:bg-[#9c3838] transition-colors font-semibold text-sm">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Shop. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
                    </div>
                </div>
            </footer>
            
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default Home;
