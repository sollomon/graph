module.exports = {
    Query:{
        photos:async(parent, args, {models})=>{
            return await models.Photo.find({});
        },
        photo:async(parent, {id}, {models})=>{
            return await models.Photo.findById(id)
        }
    },
    Photo:{
        ref:async(photo, args, {models})=>{
            return await models.Photo.findById(photo.ref);
        }
    }
}