const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
name: String,
emial: String,
password: String,
role: {
type: String,
default: "visitor"
}
})
const userModel = mongoose.model("users", userSchema)
module.exports = userModel