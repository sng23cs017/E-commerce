import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";

const URL = "http://localhost:5000/checkout";

const Checkout = () => {
    let [total, setTotal] = useState(0);
    let [textvalue, setTextvalue] = useState("");

    const [cartShow, setCartShow] = useState(false);
    const [wishlistShow, setWishlistShow] = useState(false);

    const changeCart = () => setCartShow((prev) => !prev);
    const changeWishlist = () => setWishlistShow((prev) => !prev);

    const { 
        placeOrder,
        productFilter,
        handleChange,
        searchValue,
        clearData,
        searchBar,
        showSearchBar,
        addToCart,
        cart,
        wishlist,
        productCount,
        removeFromCart,
    } = useContext(ProductContext);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const result = await axios(URL);
        setTotal(result.data);
    };

    const cuponapplayHandleChange = async (event) => {
        setTextvalue(event.target.value);
    };

    const cuponapplay = async (event) => {
       try {
        event.preventDefault();
        let amount;
        if (textvalue === "DISCOUNT10") {
            amount = 10;
        } else {
            amount = 20;
        }

        const response = await axios("http://localhost:5000/cuponapplay", {
            method: "POST",
            data: { amount },
        });
        setTotal(response.data);
        toast.success("Coupon applied!");
       } catch (error) {
        toast.error("Failed to apply coupon");
       }
    };

    return (
        <div className="max-w-[1640px] mx-auto border-[5px] border-[#f0f0f0] min-h-screen mb-10 overflow-hidden relative flex flex-col justify-between">
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
                        <FaRegBell size={25} className="cursor-pointer hover:text-[#b34141]" />
                    </Link>
                    <MdOutlineFavoriteBorder size={25} className="cursor-pointer" onClick={changeWishlist} />
                </div>
            </div>

            {/* Category Filter */}
            <div className="w-full px-4 md:px-10 mb-5 overflow-x-auto hide-scrollbar">
                <div className="w-full border-y-[1px] border-[#a7a0a0] flex md:justify-center">
                    <div className="min-w-max md:w-[700px] py-3 flex gap-6 md:gap-0 md:justify-between items-center text-sm md:text-base">
                        <Link to="/">
                            <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("All Category")}>
                                ALL CATEGORY
                            </p>
                        </Link>
                        <Link to="/">
                            <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("men's clothing")}>
                                MEN'S CLOTHING
                            </p>
                        </Link>
                        <Link to="/">
                            <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("jewelery")}>
                                JEWELERY
                            </p>
                        </Link>
                        <Link to="/">
                            <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("electronics")}>
                                ELECTRONICS
                            </p>
                        </Link>
                        <Link to="/">
                            <p className="cursor-pointer hover:text-[#b34141]" onClick={() => productFilter("women's clothing")}>
                                WOMEN'S CLOTHING
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ==== cart ====   */}
            <div
                className={
                    cartShow
                        ? "fixed top-0 right-0 w-full sm:w-[520px] h-screen overflow-y-auto bg-[#d6d2d2] z-30 duration-300 p-3 sm:rounded-l-lg shadow-2xl"
                        : "fixed top-0 right-[-100%] w-full sm:w-[520px] h-screen bg-[#d6d2d2] z-30 duration-300 p-3 sm:rounded-l-lg"
                }
            >
                <div className="w-full h-10 mb-5 flex justify-between items-center">
                    <p className="text-[25px] font-bold">Cart</p>
                    <RxCross2 size={25} className="cursor-pointer" onClick={changeCart} />
                </div>

                {cart.map((data) => (
                    <div className="w-full h-auto min-h-[128px] bg-white rounded-lg flex p-2 mb-4 relative" key={data.id}>
                        <div className="h-28 w-[100px] shrink-0 bg-[#f4f4f4] rounded-2xl flex justify-center items-center overflow-hidden">
                            <img src={data.image} alt="" className="product-small-image object-contain h-full w-full mix-blend-multiply" />
                        </div>

                        <div className="flex-1 ml-3 relative pb-8">
                            <RxCross2
                                size={20}
                                className="cursor-pointer absolute top-0 right-0"
                                onClick={() => removeFromCart(data.id)}
                            />
                            <p className="text-[18px] md:text-[20px] font-bold mb-1 pr-6 truncate">{data.title.split(" ")[0]}</p>
                            <p className="text-xs md:text-sm line-clamp-2">{data.title}</p>
                            <div className="w-full h-8 flex justify-between items-center absolute bottom-0 left-0">
                                <p className="font-semibold text-sm md:text-base">RS {data.price}/-</p>
                                <div className="w-[110px] md:w-[130px] h-full flex justify-between items-center">
                                    <div
                                        className="w-8 h-8 flex justify-center items-center rounded-md bg-[#c42e42] cursor-pointer text-white font-bold"
                                        onClick={() => productCount(-1, data.id)}
                                    >
                                        -
                                    </div>
                                    <div className="flex-1 mx-1 h-8 flex justify-center items-center rounded-md bg-[grey] text-white text-sm font-semibold">
                                        {data.qty}
                                    </div>
                                    <div
                                        className="w-8 h-8 flex justify-center items-center rounded-md bg-[#c42e42] cursor-pointer text-white font-bold"
                                        onClick={() => productCount(1, data.id)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ==== wishlist ====   */}
            <div
                className={
                    wishlistShow
                        ? "fixed top-0 right-0 w-full sm:w-[500px] h-screen overflow-y-auto bg-[#d6d2d2] z-30 duration-300 p-3 sm:rounded-l-lg shadow-2xl"
                        : "fixed top-0 right-[-100%] w-full sm:w-[500px] h-screen bg-[#d6d2d2] z-30 duration-300 p-3 sm:rounded-l-lg"
                }
            >
                <div className="w-full h-10 mb-5 flex justify-between items-center">
                    <p className="text-[25px] font-bold">Wishlist</p>
                    <RxCross2 size={25} className="cursor-pointer" onClick={changeWishlist} />
                </div>

                {wishlist.map((data) => (
                    <div className="w-full h-auto min-h-[128px] bg-white rounded-lg flex p-2 mb-4" key={data.id}>
                        <div className="h-28 w-[100px] shrink-0 bg-[#f4f4f4] rounded-2xl flex justify-center items-center overflow-hidden">
                            <img src={data.image} alt="" className="product-small-image-wish object-contain h-full w-full mix-blend-multiply" />
                        </div>
                        <div className="flex-1 ml-3 relative pb-10">
                            <p className="text-[18px] md:text-[20px] font-bold truncate pr-6">{data.title.split(" ")[0]}</p>
                            <p className="text-xs md:text-sm line-clamp-2">{data.title}</p>
                            <div className="w-full h-8 flex flex-wrap justify-between items-center absolute bottom-0 left-0 gap-2">
                                <p className="font-semibold text-sm md:text-base">RS {data.singleprice}/-</p>
                                <div
                                    className="px-4 h-full flex justify-center items-center text-white bg-[#c42e42] cursor-pointer rounded-md text-sm whitespace-nowrap shadow-sm"
                                    onClick={() => addToCart(data.id)}
                                >
                                    Add to Cart
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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

            {/* Main Content: Checkout */}
            <div className="flex-1 w-full px-4 md:px-10 py-10 flex justify-center items-center">
                <div className="w-full max-w-[550px] bg-white p-8 rounded-2xl shadow-xl border-[1px] border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout Summary</h2>
                    
                    <div className="w-full h-[160px] bg-gradient-to-r from-[#b34141] to-[#d65555] rounded-xl flex flex-col justify-center items-center shadow-lg mb-8">
                        <p className="text-lg font-medium text-white/80 mb-1">TOTAL AMOUNT TO PAY</p>
                        <p className="text-4xl font-bold text-white tracking-wider"> Rs {total} /-</p>
                    </div>

                    <form onSubmit={cuponapplay} className="w-full mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Have a coupon code?</label>
                        <div className="flex h-[45px]">
                            <input
                                type="text"
                                name="amountvalue"
                                placeholder="Enter coupon code"
                                className="flex-1 h-full outline-none px-4 rounded-l-lg border-[1px] border-gray-300 focus:border-[#b34141] transition-colors bg-white"
                                onChange={cuponapplayHandleChange}
                            />
                            <button
                                className="px-6 h-full bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer flex justify-center items-center text-white rounded-r-lg font-semibold"
                                type="submit"
                            >
                                Apply
                            </button>
                        </div>
                    </form>

                    <div className="mb-8">
                        <p className="text-sm text-gray-500 mb-3 font-medium">Available Coupons:</p>
                        <div className="flex flex-col gap-3">
                            <div className="w-full bg-gray-50 border-[1px] border-gray-200 rounded-lg p-3 flex justify-between items-center hover:border-[#b34141] transition-colors cursor-pointer group">
                                <span className="font-mono font-bold text-[#b34141] group-hover:scale-105 transition-transform">DISCOUNT10</span>
                                <span className="text-sm text-gray-600">Save Rs. 10</span>
                            </div>
                            <div className="w-full bg-gray-50 border-[1px] border-gray-200 rounded-lg p-3 flex justify-between items-center hover:border-[#b34141] transition-colors cursor-pointer group">
                                <span className="font-mono font-bold text-[#b34141] group-hover:scale-105 transition-transform">DISCOUNT20</span>
                                <span className="text-sm text-gray-600">Save Rs. 20</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-full h-[50px] bg-[#b34141] hover:bg-[#9c3838] transition-colors flex justify-center items-center cursor-pointer text-white rounded-lg text-lg font-bold shadow-md"
                        onClick={placeOrder}
                    >
                        Place Order
                    </div>
                    
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-500 hover:text-[#b34141] underline transition-colors">Return to Shop</Link>
                    </div>
                </div>
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
                            <Link to="/"><li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">Home</li></Link>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">About Us</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">Contact</li>
                            <li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit">FAQs</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Categories</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <Link to="/"><li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("men's clothing")}>Men's Clothing</li></Link>
                            <Link to="/"><li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("women's clothing")}>Women's Clothing</li></Link>
                            <Link to="/"><li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("electronics")}>Electronics</li></Link>
                            <Link to="/"><li className="cursor-pointer hover:text-[#b34141] transition-colors w-fit" onClick={() => productFilter("jewelery")}>Jewelery</li></Link>
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

export default Checkout;
