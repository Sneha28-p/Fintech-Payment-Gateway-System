const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getWallet, addMoney } = require("../controllers/walletController");

router.get("/", auth, getWallet);
router.post("/add", auth, addMoney);

module.exports = router;