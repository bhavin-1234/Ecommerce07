const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const checkout = async (req, res) => {
    const { totalAmount } = req.body;
    const options = {
        amount: totalAmount * 100,
        currency: "INR"
    };

    const order = await instance.orders.create(options);
    res.json({
        success: true,
        order
    });
};

const paymentVerification = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({
        razorpayOrderId,
        razorpayPaymentId
    });
}


module.exports = { checkout, paymentVerification };