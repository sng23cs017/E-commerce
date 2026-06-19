const datas = require("../datas.json");

let tempdata = [...datas];
let cart = [];
let wishlist = [];
let order = [];

let bought = [];

const products = (req, res) => {
    res.json({ datas, cart, wishlist, order });
};

const addcart = (req, res) => {
    const isexist = cart.find((user) => user.id == req.body.id);
    if (isexist == undefined) {
        const Result = datas.find((data) => data.id == req.body.id); 
        if (Result) {
            let newItem = { ...Result };
            newItem.qty = 1;
            newItem.singleprice = newItem.price;
            cart.push(newItem);
            res.json(cart);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } else {
        res.json({ message: "Exist" });
    }
};

const removecart = (req, res) => {
    const index = cart.findIndex((item) => item.id == req.body.id);
    if (index > -1) {
        cart.splice(index, 1);
    }
    res.json(cart);
};

const count = (req, res) => {
    const itemInCart = cart.find((data) => data.id == req.body.id);
    if (!itemInCart) return res.json(cart);

    if (req.body.value == 1) {
        itemInCart.qty = (itemInCart.qty || 1) + 1;
    } else {
        if (itemInCart.qty > 1) {
            itemInCart.qty = itemInCart.qty - 1;
        }
    }
    
    // update price based on singleprice and qty
    itemInCart.price = Number((itemInCart.singleprice * itemInCart.qty).toFixed(2));
    
    res.json(cart);
};

let checkout = (req, res) => {
    let formattedNumber = cart.reduce((total, item) => total + item.price, 0);
    const total = formattedNumber.toFixed(2);
    res.json(total);
};

let notifications = (req, res) => {
    let total = cart.reduce((total, item) => total + item.price, 0);
    res.json(total);
};

let addwishlist = (req, res) => {
    const isexist = wishlist.find((user) => user.id == req.body.id);
    if (isexist == undefined) {
        const Result = datas.find((data) => data.id == req.body.id);
        if (Result) {
            let newItem = { ...Result };
            newItem.singleprice = newItem.price;
            wishlist.push(newItem);
            res.json(wishlist);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } else {
        res.json({ message: "Exist" });
    }
};

let cuponapplay = (req, res) => {
    let formattedNumber = cart.reduce((total, item) => total + item.price, 0);
    const total = formattedNumber.toFixed(2);
    const discount = (total * req.body.amount) / 100;
    let ogtotal = (total - discount).toFixed(2);

    res.json(ogtotal);
};

let placeorder = (req, res) => {
    let temp1 = [...order];
    let temp2 = [...cart];
    let temp3 = [temp1, temp2];
    order = temp3.flat();
    cart = []; // clear cart after placing order
    res.json({ order, message: "success" });
};

module.exports = {
    products,
    addcart,
    count,
    removecart,
    checkout,
    notifications,
    addwishlist,
    cuponapplay,
    placeorder,
};