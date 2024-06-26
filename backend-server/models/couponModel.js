const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    expiryTime: {
      type: String,
      required: true,
    },
    expiryDateTime: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timeStamps: true }
);

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
