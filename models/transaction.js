const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      trim: true,
      required: "Enter an amount",
    },
    date: {
      type: Date,
      trim: true,
      default: Date.now
    }
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
