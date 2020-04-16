const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}

module.exports = {
    Query:{
        allusers:async(parent, args, {models})=>{
            return await models.User.find({});
        },
        users:async(parent, {ids}, {models})=>{
            return await models.User.find({_ids:{$in:ids}});
        },
        user:async(parent, {id}, {models})=>{
            return await models.User.findById(id);
        },
    },
    Mutation:{
        createUser:async(parent, {fName, lName, password, username, email, phone}, {models})=>{
            let newuser = new models.User({
                fName,
                lName,
                password:hashPassword(password),
                username,
                email,
                phone,
            });
            return await newuser.save();
        },
    },
}