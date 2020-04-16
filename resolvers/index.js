const {GraphQLDateTime} = require('graphql-iso-date');

const userResolver = require('./user');
const categoryResolver = require('./category');
const contactResolver = require('./contact');
const goodResolver = require('./good');
const investmentResolver = require('./investment');
const photoResolver = require('./photo');
const shopResolver = require('./shop');
const workResolver = require('./work');
const accountResolver = require('./account');
const groupResolver = require('./group');
const postResolver = require('./post');

const customScalarResolver = {
    Date:GraphQLDateTime,
};

module.exports = [
    userResolver,
    customScalarResolver,
    categoryResolver,
    contactResolver,
    goodResolver,
    investmentResolver,
    photoResolver,
    shopResolver,
    workResolver,
    accountResolver,
    groupResolver,
    postResolver,
];