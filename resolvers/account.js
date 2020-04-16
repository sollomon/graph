module.exports = {
    Query:{
        accounts:async(parent, args, {models}) =>{
            return await models.Account.find({});
        },
        account:async(parent, {id}, {models})=>{
            return await models.Account.findById(id)
        },
    },
    Account:{
        ref:async(account, args, {models})=>{
            return await models.User.findById(account.ref);
        }
    }
};