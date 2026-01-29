const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/cart/add/:productId", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productId);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

  let success = req.flash("success");
  res.render("cart", { user, bill });
});


router.post('/update-quantity', async (req, res) => {
    const { productId, action } = req.body
    const user = await User.findById(req.session.user._id)

    const item = user.cart.find(i => i._id.toString() === productId)

    if (item) {
        if (action === 'increase') {
            item.quantity += 1
        }
        if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1
        }
        await user.save()
    }

    const bill = user.cart.reduce(
        (sum, item) => sum + (item.price - item.discount) * item.quantity,
        0
    ) + 20

    res.json({ quantity: item.quantity, bill })
})

module.exports = router;
