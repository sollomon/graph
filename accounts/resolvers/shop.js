module.exports = {
    Query:{
        allshops:async(parent, args, {models})=>{
            return await models.Shop.find({});
        },
        shops:async(parent, {ids}, {models})=>{
            return await models.Shop.find({_id:{$in:ids}});
        },
        shop:async(parent, {id}, {models})=>{
            return await models.Shop.findById(id);
        },
    },
    Mutation:{
        createShop:async(parent, {name, admin, username, email, phone}, {models})=>{
            let newshop = new models.Shop({
                admin,
                name,
                username,
                email,
                phone
            });
            return await newshop.save();
        },
    },
    Shop:{
        admin:async(shop, args, {models})=>{
            return await models.User.findById(shop.admin);
        },
    }
}