const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
    fName:String,
    lName:String,
    password:String,
    username:String,
    contact:String,
    shops:[String],
    email:String,
    phone:String,
});

const User = mongoose.model('User', userSchema);

const shopSchema = new Schema({
    name:String,
    admin:String,
    branches:[String],
    username:String,
    subscribers:[String],
    contact:String,
    shops:[String],
    email:String,
    phone:String,
})

const Shop = mongoose.model('Shop', shopSchema);

const workSchema = new Schema({
    ref:String,
    shop:String,
    role:[String],
    access:[String],
})

const Work = mongoose.model('Work', workSchema);

module.exports = {
    User,
    Shop,
    Work,
}