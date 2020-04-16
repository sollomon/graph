const { gql } = require('apollo-server-express');

module.exports =  gql`
  extend type Query {
    users: [User!]
    yourusers(ids:[ID!]):[User!]
    user(id: ID!): User!
  }

  extend type Mutation{
      signUp(username:String!,fName:String!, lName:String! email:String!,photo:String,address:String,location:String, password:String!):UToken!
      signIn(login:String!, password:String!):UToken!
      deleteUser(id:ID!):Boolean!
  }

  type UToken{
      uToken:String!
      wToken:String!
      sToken:String!
  }

  type User {
    id: ID!
    username: String!
    photos:[Photo!]
    fName:String!
    lName:String!
    contact:Contact!
    goods:[Good!]
    shops:[Shop!]
    accounts:[Account!]
  }
`;
