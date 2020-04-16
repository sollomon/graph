module.exports={
    Query:{
        groups:async(parent, args, {models})=>{
            return await models.Group.find({})
        },
        group:async(parent, {id}, {models})=>{
            return await models.Group.findById(id);
        },
        myGroups:async(parent, args, {models, me})=>{
            return await models.Group.find({users:me.id})
        }
    },
    Mutation:{
        createGroup:async(parent, {name, username, users}, {models, me})=>{
            let group = new models.Group({
                name:name,
                username:username,
                users:users,
                admin:me.id,
                createdBy:me.id
            });
            return await group.save()
        }
        
    },
    Group:{
        users:async(group, args, {models})=>{
            return await models.User.find({_id:group.users});
        },
        createdBy:async(group, args, {models})=>{
            return await models.User.findById(group.createdBy);
        },
        admin:async(group,args,{models})=>{
            return await models.User.findById(group.admin);
        },
    }
}