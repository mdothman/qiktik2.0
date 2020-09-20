const router = require("express").Router();
const userRoutes = require("./users");
const authRoutes = require("./auth");
const signupRoutes = require("./signup");
const stocksRoutes = require("./stocks");

router.use("/signup", signupRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/", stocksRoutes)

module.exports = router;
