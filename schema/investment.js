const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        investments:[Investment!]
        investment(id:ID!):Investment!
        myInvestment:Investment!
    }

    type Investment{
        id:ID!
        stake:String!
        ref:User!
        access:String!
    }
`