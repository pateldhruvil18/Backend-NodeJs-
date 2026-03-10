const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.signup = async (req, res) => {
    try{
     const {name, email, password, role} = req.body;
     const existingUser = await User.findOne({email});

     if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        });
     }

     let hashPassword;

     try{
        hashPassword = await bcrypt.hash(password, 10)
     } catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error in hashing password'
        });
     }

     const user = await User.create({
        name, email, password:hashPassword, role
     })

     return res.status(201).json({
        success: true,
        message: "User create Successfully"
     })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User cannot created "
        })
    }
}

exports.login = async (req, res) => {
       try {
        const {email, password}= req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter the details carefully"
            })
        }

        let user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not registered Yet"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        if(await bcrypt.compare(password,user.password)){
            //password match
            const token = jwt.sign(payload, 
                                        process.env.JWT_SECRET, 
                                        {
                                            expiresIn: "2h"
                                        }
            )
            
            user = user.toObject();
            user.token = token;
            user.password = undefined

            const options = {
               expires : new Date(Date.now() + 3*24*60*60*1000),
               httpOnly: true
            }

            res.cookie("token", token,options).status(201).json({
                success: true,
                token,
                user,
                message: "User logged in Sccessfully"
            })
        }

        else{
            return res.status(403).json({
                success:false,
                message:"Incorrect password",
            })
        }
       } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Login failed"
        })
       }
}