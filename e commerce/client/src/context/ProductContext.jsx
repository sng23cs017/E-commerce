import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

const URL = "http://localhost:5000";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchBar, setSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [tempProductResult, setTempProductResult] = useState([]);
    const [category, setCategory] = useState("All Category");
    const [cart, setCat] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [order, setOrder] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const result = await axios(URL);
        setProducts(result.data.datas);
        setTempProductResult(result.data.datas);
        setCat(result.data.cart);
        setWishlist(result.data.wishlist);
    };

    const productFilter = async (event) => {
        if (event == "All Category") return setTempProductResult(products), setCategory(event);
        const Result = products.filter((data) => data.category.toLowerCase() == event);
        setCategory(event);
        setTempProductResult(Result);
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        const Result = products.filter((data) => data.title.toLowerCase().includes(event.target.value));
        setTempProductResult(Result);
    };

    const clearData = () => {
        setSearchValue("");
        setTempProductResult(products);
    };

    const showSearchBar = () => {
        setSearchBar((prev) => !prev);
    };

    const addToCart = async (id) => {
        try {
            const response = await axios(`${URL}/addcart`, {
                method: "POST",
                data: { id },
            });
            if (response.data.message == "Exist") {
                toast.error("Alredy Exist.");
            } else {
                setCat(response.data);
                toast.success("add to cart Successful!");
            }
        } catch (error) {}
    };
    const removeFromCart = async (id) => {
        try {
            const response = await axios(`${URL}/removecart`, {
                method: "POST",
                data: { id },
            });
            setCat(response.data);
        } catch (error) {}
    };

    const productCount = async (value, id) => {
        try {
            const response = await axios(`${URL}/count`, {
                method: "POST",
                data: { value, id },
            });
            setCat(response.data);
        } catch (error) {}
    };
    const addToWishlist = async (id) => {
        try {
            const response = await axios(`${URL}/addwishlist`, {
                method: "POST",
                data: { id },
            });
            if (response.data.message == "Exist") {
                toast.error("Alredy Exist.");
            } else {
                setWishlist(response.data);
                toast.success("add to wishlist Successful!");
            }
        } catch (error) {}
    };

    const placeOrder = async () => {
        try {
            const response = await axios("http://localhost:5000/placeorder");
            setOrder(response.data.order);
            if (response.data.message == "success") {
                navigate("/notifications");
            }
        } catch (error) {}
    };

    return (
        <ProductContext.Provider
            value={{
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
                placeOrder,
                order,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
