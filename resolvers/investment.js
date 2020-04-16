module.exports = {
    Query:{
        investments:async (parent, args, {models})=>{
            return await models.Investment.find({});
        },
        investment:async(parent, {id}, {models})=>{
            return await models.Investment.findById(id);
        },
        myInvestment:async(parent,{id}, {models,myShops})=>{
            if(!myShops){
                return null;
            }
            return await models.Investment.find(myShops.id)
        }
    },
    Investment:{
        ref:async(investment, args, {models})=>{
            return await models.User.findById(investment.ref);
        }
    }
}