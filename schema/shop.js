const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        shops:[Shop!]
        shop(id:ID!):Shop!
        myShop:[Shop!]
    }

    extend type Mutation{
        addWork(workId:String!, userId:ID!, shopId:String!, role:String!, access:String!, password:String!):Work!
        createShop(name:String!, username:String!, email:String!, phone:String!):Shop!
    }

    type Shop{
        id:ID!
        name:String!
        username:String!
        contact:Contact!
        category:Category!
        suppliers:[String!]
        customers:[String!]
        sales:[Good!]
        purchases:[Good!]
        workers:[Work!]
        admin:User!
        photo:[Photo!]
        owner:Owner!
    }
    type Owner{
        id:ID!
        username:String!
        photo:[Photo!]
    }
`