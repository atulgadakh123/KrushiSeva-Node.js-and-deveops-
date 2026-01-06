const Payment = require("../model/Payment")

exports.accessMiddleware = async (req, res, next) => {
    try {
        if (req.user.role === "expert" || req.user.role === "admin") {
            return next()
        }

        const userPayment = await Payment.findOne({
            user: req.user.id,
            status: "completed"
        })

        if (!userPayment) {
            return res.status(403).json({
                message: "Payment required to access this feature"
            })
        }

        next()
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
