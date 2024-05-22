import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    expiry: {
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
export default mongoose.model("Coupon", couponSchema);