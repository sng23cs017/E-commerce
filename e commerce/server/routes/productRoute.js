const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")

router.get("/", productController.products);
router.post("/addcart", productController.addcart);  
router.post("/addwishlist", productController.addwishlist);  
router.post("/count", productController.count);  
router.post("/removecart", productController.removecart);  
router.get("/checkout", productController.checkout);  
router.get("/notifications", productController.notifications);  
router.post("/cuponapplay", productController.cuponapplay);  
router.get("/placeorder", productController.placeorder);  

module.exports = router;