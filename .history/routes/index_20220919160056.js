const router = require("express").Router();
const authRoutes = require("./auth");
const productRoutes = require("./product.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/products", productRoutes )
router.use("/categories",)

module.exports = router;
