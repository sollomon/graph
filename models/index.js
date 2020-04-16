const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const shopSchema = new Schema({
    name:String,
    username:String,
    sales:[String],
    suppliers:[String],
    customers:[String],
    purchases:[String],
    admin:String,
    workers:[String],
    category:[String],
    owner:String,
},{timestamps:true});

const Shop = mongoose.model('Shop', shopSchema);

Shop.findOwner = async ownerId =>{
    let owner = await User.findById(ownerId);
    if(!owner){
        owner = await Shop.findById(ownerId);
    }
    return owner;
}

const postSchema = new Schema({
    subject:String,
    body:String,
    ref:String,
},{timestamps:true});

const Post  = mongoose.model('Post', postSchema);

Post.findPoster = async posterId=>{
    let poster = await User.findById(posterId);
    if(!poster){
        poster = await Shop.findById(posterId);
    }
    return poster
}

const groupSchema = new Schema({
    name:String,
    username:String,
    users:[String],
    createdBy:String,
    admin:String,
},{timestamps:true});

const Group = mongoose.model('Group', groupSchema);

const userSchema = new Schema({
    username:String,
    fName:String,
    lName:String,
    goods:[String],
    shop:[String],
    password:String,
});

const User = mongoose.model('User', userSchema);

User.verifyHash = async (password, original)=>{
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

    return await hash === originalHash

}

const contactSchema = new Schema({
    ref:String,
    email:[String],
    phone:[String],
    code:[String],
    postal:[String],
    location:[String],
    geo:[String],
    Address:[String]
});

const Contact = mongoose.model('Contact', contactSchema);

const photoSchema = new Schema({
    desc:[String],
    ref:{type:String, required:[true, "Reference of owner required"]},
    name:String,
    url:{type:String, required:[true, "Url of photo cant be blank"]},
    type:String,
});

const Photo = mongoose.model('Photo', photoSchema);

const goodSchema = new Schema({
    name:String,
    desc:[String],
    category:[String],
})

const Good = mongoose.model('Good', goodSchema);

const categorySchema  = new Schema({
    name:String,
    desc:[String],
    subCategories:[String]
})

const Category = mongoose.model('Category', categorySchema);

const workSchema = new Schema({
    ref:String,
    role:[String],
    password:String,
    access:[String],
    workId:String,
    shopId:String,
});

const Work = mongoose.model('Work', workSchema);


Work.verifyHash = async (password, original)=>{
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

    return await hash === originalHash

}
/*const adminSchema =  new Schema({
    ref:String,
    access:[String],
})

const Admin = mongoose.model('Admin', adminSchema);*/

const accountSchema = new Schema({
    ref:String,
    details:[String],
})

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    Account:Account,
    Shop:Shop,
    User:User,
    Contact:Contact,
    Photo:Photo,
    Good:Good,
    Category:Category,
    Work:Work,
    Group:Group,
    Post:Post,
    //Admin, Admin,
}