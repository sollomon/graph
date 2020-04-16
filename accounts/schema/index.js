const {gql} = require('apollo-server-express');

const shopSchema = require('./shop');
const userSchema = require('./user');
const workSchema = require('./work');

const linkSchema = gql`
    scalar Date

    type Query{
        _:Boolean
    }
    type Mutation{
        _:Boolean
    }
    type Subscription{
        _:Boolean
    }
`;

module.exports = [
    shopSchema,
    userSchema,
    workSchema,
    linkSchema,
]