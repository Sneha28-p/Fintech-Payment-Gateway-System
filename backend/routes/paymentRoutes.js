const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { pay, refund, retryPayment } = require("../controllers/paymentController");

router.post("/pay", auth, pay);
router.post("/refund",auth,refund);
router.post("/retry",auth,retryPayment)

module.exports = router;