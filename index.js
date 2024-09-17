const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');

const app = express()
app.use(express.json())  //Parsing incoming JSON payloads.
app.use(cors({           //configure frontend running on a different ports
    origin: ["http://localhost:5174"],
    method: ["GET", "POST"],
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/employee');

const varifyUser = (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing")
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Error with token")
            }else{
                if(decoded.role === "admin"){
                    next()
                }else{
                    return res.json("not admin")
                }
            }
            
        });
    }
}
app.get('/dashboard',varifyUser ,(req, res) =>{
    res.json("Success")
})


app.post('/register', (req, res) => {
    const {name,email,password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        userModel.create({name, email, password: hash})
        .then(user => res.json({status: "OK"}))
        .catch(err => res.json(err))
    }) .catch(err => res.json(err))
})

app.post('/updateUser', (req, res) => {
    const {name,email,password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        userModel.updateOne({name, email, password: hash})
        .then(user => res.json({status: "OK"}))
        .catch(err => res.json(err))
    }) .catch(err => res.json(err))
})        

app.post('/login', (req, res) => {
    console.log("login called");
    const { email, password } = req.body;

    userModel.findOne({ email: email })
    .then(user => {
        if (user) {
            console.log("user");  
            console.log(user);
            
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    console.log("response");  
                    console.log(response);

                    const token = jwt.sign(
                        { email: user.email, role: user.role },
                        "jwt-secret-key",
                        { expiresIn: '1d' }
                    );

                    // Set the token in a cookie
                    res.cookie('token', token, { httpOnly: true });


                    return res.json({ message: "Login successful" });
                } else {
                    return res.json({ message: "The password is incorrect" });
                }
            });
        } else {
            return res.json({ message: "User not found" });
        }
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

app.listen(3001, () => {
console.log("Server is Running")
})

const nodemailer = require('nodemailer');

app.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    userModel.findOne({email: email})
        .then(user => {
        if(!user) {
        return res.send({Status: "User not exist"})
        }
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})

        //node.js email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset your password',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send({status: "Success"})
            }
          });
    })
 });

 app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
         } else {
            bcrypt.hash (password, 10)
            .then(hash =>{
            userModel.findByIdAndUpdate({_id:id}, {password: hash})
            .then(u => res.send({status: err}))
         })
            .catch(err => res.send({status: err}))
        }
    })
})
