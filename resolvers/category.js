module.exports = {
    Query:{
        categories:async(parent, args, {models}) =>{
            return await models.Category.find({});
        },
        category:async(parent, {id}, {models})=>{
            return await models.Category.findById(id)
        },
    },
    Category:{
        subCategories:async(category, args, {models})=>{
            return await models.Category.find({id:category.subCategories})
        },
    },
};
