module.exports = {
    Query:{
        contacts:async(parent, args, {models})=>{
            return await models.Contact.find({});
        },
        contact:async(parent, {id}, {models})=>{
            return await models.Contact.findById(id)
        },
    },
    Contact:{
        ref:async(contact, args, {models})=>{
            return await models.User.findById(contact.ref);
        }
    }
}