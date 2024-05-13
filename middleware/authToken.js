const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("token", token);

        if (!token) {
            return res.status(401).json({
                message: "Please login to access this resource",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log("error auth", err);

                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: "Token has expired",
                        error: true,
                        success: false
                    });
                } else {
                    return res.status(401).json({
                        message: "Invalid token",
                        error: true,
                        success: false
                    });
                }
            }

            req.userId = decoded._id;
            next();
        });
    } catch(err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
