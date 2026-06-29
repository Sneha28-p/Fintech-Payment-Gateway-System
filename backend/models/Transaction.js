const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },
  idempotencyKey: {
    type: String,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);