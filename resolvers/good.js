module.exports = {
    Query:{
        goods:async(parent, args, {models})=>{
            return await models.Good.find({});
        },
        good:async(parent, {id}, {models})=>{
            return await models.Good.findById(id)
        }
    },
    Mutation:{
      addGood:async(parent, {name, desc, category},{models})=>{
        let good = new models.Good({
          name:name,
          desc:desc,
          category:category,
        });
        return await good.save();
      }
    },
    Good:{
        category:async(good, args, {models})=>{
            return await models.Category.find({_id:good.category})
        },
        photos:async(good, args, {models})=>{
            return await models.Photo.find({ref:good.id})
        }
    }
}
