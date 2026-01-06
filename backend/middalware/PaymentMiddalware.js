const Payment = require("../model/Payment");

const paymentMiddleware = async (req, res, next) => {
  try {
    if (req.user.role === "expert" || req.user.role === "admin") {
            return next()
        }
    const payment = await Payment.findOne({
      user: req.user.id,        
      status: "completed"      
    });
  
    if (!payment) {
      return res.status(403).json({
        message: "payment required to access this experts chat"
      });
    }

   
    next();

  } catch (error) {
    return res.status(500).json({
      message: "Payment check failed",
      error: error.message
    });
  }
};

module.exports = paymentMiddleware;
