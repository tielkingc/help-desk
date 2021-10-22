const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    createdAt: String, 
    admin: Boolean
})

module.exports = model('User', userSchema);