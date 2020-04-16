const {pubsub,EVENTS} = require('../subscription');

module.exports={
    Query:{
        posts:async(parent, {cursor,limit=100}, {models})=>{
            return await models.Post.find({}).limit(limit);
        },
        post:async(parent, {id}, {models})=>{
            return await models.Post.findById(id);
        },
        myPosts:async(parent, args, {models, me})=>{
            return await models.Post.find({ref:me.id});
        }
    },
    Mutation:{
        addPost:async(parent, {subject, body}, {models, me})=>{
            let newpost = new models.Post({
                subject,
                body,
                ref:me.id
            });
             const post = await newpost.save();
             pubsub.publish(EVENTS.POST.CREATED,{
                 postCreated:{post}
             });
             return post;
        }
    },
    Post:{
        ref:async(post, args, {models})=>{
            return await models.Post.findPoster(post.ref)
        }
    },
    Subscription:{
        postCreated:{
            subscribe:()=>pubsub.asyncIterator(EVENTS.POST.CREATED),
        }
    }
}