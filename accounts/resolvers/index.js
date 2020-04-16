const {GraphQLDateTime} = require('graphql-iso-date');

const shopResolver = require('./shop');
const userResolver = require('./user');
const workResolver = require('./work');

const customScalarResolver = {
    Date:GraphQLDateTime,
};

module.exports = [
    shopResolver,
    userResolver,
    workResolver,
    customScalarResolver
]