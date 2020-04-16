const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        contacts:[Contact!]
        contact(id:ID!):Contact!
    }

    type Contact{
        id:ID!
        ref:User!
        email:[String!]
        phone:[String!]
        location:String!
        address:String!
    }
`
