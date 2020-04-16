const jwt  = require('jsonwebtoken');
const crypto = require('crypto');
const {combineResolvers} = require('graphql-resolvers');
const {isAuthenticated, isHireFire} = require('./authorization');


const createToken = async (shops, secret, expiresIn)=>{

    return await jwt.sign(shops, secret, {expiresIn});
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}

module.exports = {
    Query:{
        shops:async (parent, args, {models})=>{
            return await models.Shop.find({});
        },
        shop:async(parent, {id}, {models})=>{
            return await models.Shop.findById(id);
        },
        myShop:async(parent, args, {models, myShops})=>{
            if(!myShops){
                console.log('null')
                return null;
            }
            console.log(myShops);
            return await models.Shop.find({_id:myShops.shopids});
        },
    },
    Mutation:{
        createShop:combineResolvers(
            isAuthenticated,
            async(parent, {name, username, phone, email, },{models, me})=>{
            const shop = new models.Shop({
                name:name,
                username:username,
                admin:me.id,
                owner:me.id,
            });

            return await shop.save().then(async createdShop=>{
                const contact = new models.Contact({
                    ref:createdShop.id,
                    email:email,
                    phone, phone
                });
                await contact.save();
                let newWork = new models.Work({
                    ref:me.id,
                    role:"ADMIN",
                    password:hashPassword("Change password"),
                    access:"ADMIN",
                    workId:"EMPLOYEE 1",
                    shopId:createdShop.id
                })
                const admin = await newWork.save();

                return await createdShop.update({$push:{workers:admin.id}});
            })
        }),
        addWork:combineResolvers(
            async(parent, {workId,shopId}, {models,myWork})=>{
                //const shop = await models.Shop.findById(shopId);
                const work = await models.Work.find({_id:myWork.workids,shopId:shopId});
                if(!work){
                    console.log('Not Worker')
                }
                const isWorker = await models.Shop.find({_id:shopId,workers:{$in:[myWork.workids]}})
                if(isWorker){
                    return skip;
                }
                console.log('not worker')
                return null;

            },
            async(parent, {workId,userId,role, access,shopId, password}, {models})=>{
            const work = new models.Work({
                workId:workId,
                ref:userId,
                role:role,
                password:password,
                access:access,
                shopId:shopId,
            });
            return await work.save().then(async createdWork=>{
                const shop = await models.Shop.findById(shopId);
                return await shop.update({$push:{workers:createdWork.id}});
            })
        }),
    },
    Shop:{
        photo:async(shop, args, {models})=>{
            return await models.Photo.find({ref:shop.id})
        },
        suppliers:async(shop, args, {models})=>{
            return await models.Shops.find({_id:shop.suppliers});
        },
        customers:async(shop, args, {models})=>{
            return await models.Customers.find({_id:shop.customers});
        },
        sales:async(shop, args, {models})=>{
            return await models.Good.find({_id:shop.sales});
        },
        purchases:async(shop, args, {models})=>{
            return await models.Good.find({_id:shop.purchases});
        },
        workers:async(shop, args, {models})=>{
            return await models.Work.find({_id:shop.workers});
        },
        admin:async(shop, args, {models})=>{
            return await models.User.findById(shop.admin)
        },
        owner:async(shop, args, {models})=>{
            return await models.Shop.findOwner(shop.owner)
        },
        contact:async(shop, args, {models})=>{
            return await models.Contact.findOne({ref:shop.id});
        },
        category:async(shop, args, {models})=>{
            return await models.Category.find({_id:shop.category})
        }
    }
}