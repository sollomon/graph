const {ForbiddenError} = require('apollo-server-express');
const {combineResolvers, skip} = require('graphql-resolvers');

const isAuthenticated = (parent, args, {me})=>{
    me ? skip : new ForbiddenError('Not authenticated');
}

/*const isShopAdmin = async (parent, args, {models, me, myWork})=>{
    const works = myWork.workids;
}*/


const isHireFire = combineResolvers(
    isAuthenticated,
    (parent, args, {myWork})=>
        myWork.role === "HIREFIRE" ? skip : new ForbiddenError('Not authorized to hire.'),
);

module.exports = {
    isAuthenticated,
    //isShopAdmin,
    isHireFire,
}