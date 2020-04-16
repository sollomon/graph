const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        works:[Work!]
        work(id:ID!):Work!
        myWork:[Work!]
    }

    extend type Mutation{
        workSignIn(login:String!, password:String!):WToken!
        changeWorkPassword(login:String!, password:String!, newPassword:String!):Boolean!
    }

    type WToken{
        wToken:String!
    }

    type Work{
        id:ID!
        ref:User!
        role:[String!]
        access:[String!]
        workId:String!
        shop:Shop!
    }
`
