const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        accounts:[Account!]
        account(id:ID!):Account!
    }

    type Account{
        id:ID!
        ref:User!
        details:[String!]
    }
`