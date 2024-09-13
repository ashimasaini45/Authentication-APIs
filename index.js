const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1"],
    method: ["GET", "POST"],
    credentials:true
}))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/employee');

app.post('/register', (req, res) => {
    const {name,email,password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        userModel.create({name, email, password: hash})
        .then(user => res.json({status: "OK"}))
        .catch(err => res.json(err))
    }) .catch(err => res.json(err))
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    userModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password,(err, response)=>{
                if(response){
                    const token = jwt.sign({email: user.email, role: user.role },
                        "jwt-secret-key", {expiresIn: 'Id'}
                    )
                }else{
                    return res.json("The password is incorrect")
                }
            })
        }else {
            return res.json("No record existed")
        }
    })
})

app.listen(3001, () => {
console.log("Server is Running")
})