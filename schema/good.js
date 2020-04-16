const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        goods:[Good!]
        good(id:ID!):Good!
    }

    extend type Mutation{
      addGood(name:String!, desc:[String!], category:[String!]):Good!
    }

    type Good{
        id:ID!
        name:String!
        desc:[String!]
        category:[Category!]
        photos:[Photo!]
    }
`
