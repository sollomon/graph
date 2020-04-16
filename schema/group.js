const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        groups:[Group!]
        group:Group!
        myGroups:[Group!]
    }

    extend type Mutation{
        createGroup(name:String!, username:String!, users:[String!]):Group!
    }

    type Group{
        id:String!
        name:String!
        username:String!
        users:[User!]
        admin:User!
        createdBy:User!
    }
`