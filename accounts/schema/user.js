const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        allusers:[User!]
        user(id:ID!):User!
        users(ids:[ID!]):[User!]
    }

    extend type Mutation{
        createUser(fName:String!, lName:String!, password:String!, username:String!, email:String!, phone:String!):User!
    }
    type User{
        id:ID!
        fName:String!
        lName:String!
        username:String!
        email:String!
        phone:String!
    }
`