module.exports = {
    Query:{
        allworks:async(parent, args, {models})=>{
            return await models.Work.find({});
        },
        works:async(parent, {ids}, {models})=>{
            return await models.Work.find({_id:{$in:ids}});
        },
        work:async(parent, {id}, {models})=>{
            return await models.Work.findById(id);
        },
    },
    Mutation:{
        createWork:async(parent, {ref, shop, role}, {models})=>{
            let newwork = new models.Work({
                ref,
                shop,
                role,
            });
            return await newwork.save();
        },
    },
    Work:{
        ref:async(work, args, {models})=>{
            return await models.User.findById(work.ref);
        },
        shop:async(work, args, {models})=>{
            return await models.Shop.findById(work.shop);
        }
    }
}