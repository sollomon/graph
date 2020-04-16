const { gql } = require('apollo-server-express');

const userSchema = require('./user');
const categorySchema = require('./category');
const contactSchema = require('./contact');
const goodSchema = require('./good');
const investmentSchema = require('./investment');
const photoSchema = require('./photo');
const shopSchema = require('./shop');
const workSchema = require('./work');
const accountSchema = require('./account');
const groupSchema = require('./group');
const postSchema = require('./post');

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
    userSchema,
    categorySchema,
    contactSchema,
    goodSchema,
    investmentSchema,
    photoSchema,
    shopSchema,
    workSchema,
    linkSchema,
    accountSchema,
    groupSchema,
    postSchema,
];