const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        categories:[Category!]
        category(id:ID!):Category!
    }

    type Category{
        id:ID!
        name:String!
        desc:[String!]
        subCategories:[Category!]
    }
`