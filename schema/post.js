const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        posts(cursor:String, limit:Int):[Post!]
        post(id:ID!):Post!
        myPosts:[Post!]
    }

    extend type Mutation{
        addPost(subject:String!, body:String!):Post!
    }

    type Post{
        id:ID!
        body:String!,
        subject:String!
        ref:Owner!
        createdAt:Date!
    }
    extend type Subscription{
        postCreated:PostCreated!
    }
    type PostCreated{
        post:Post!
    }
`