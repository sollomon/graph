const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        photos:[Photo!]
        photo(id:ID!):Photo!
    }

    type Photo{
        id:ID!
        name:String!
        desc:[String!]
        ref:User!
        url:String!
    }
`