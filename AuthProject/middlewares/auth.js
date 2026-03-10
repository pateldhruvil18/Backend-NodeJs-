// auth , isStudent, isAdmin

const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.auth =  (req, res, next) => {
    try {

        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: 'Token missing'
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifing token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: " this is protected route for student"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not defined"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: " this is protected route for admin"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not defined"
        })
    }
}