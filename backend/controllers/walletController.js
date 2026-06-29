const Wallet = require("../models/Wallet");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { balance: amount } },
      { new: true }
    );

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};