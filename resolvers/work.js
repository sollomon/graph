const {AuthenticationError, UserInputError} = require('apollo-server-express')

const createToken = async (work, secret, expiresIn)=>{
    const {id, workId, role, ref, shopId}= work;
    return await jwt.sign({id, workId, role, ref, shopId}, secret, {expiresIn});
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}

module.exports = {
    Query:{
        works:async(parent, args, {models}) =>{
            return await models.Work.find({})
        },
        work:async(parent, {id}, {models})=>{
            return await models.Work.findById(id)
        },
        myWork:async(parent, {id}, {models, myWork})=>{
            if(!myWork){
                return null;
            }
            console.log(myWork);
            return await models.Work.find({_id:myWork.workids});
        }
    },
    Mutation:{
        workSignIn:async(parent, {login, password}, {models, secret})=>{
            const work = await models.Work.findOne({workId:login});
            if(!work){
                throw new UserInputError("No User Found");
            }
            const isValid = await models.Work.verifyHash(password, work.password);

            if(!isValid){
                throw new AuthenticationError("Invalid Password");
            }
            return {wToken:createToken(work, secret, '40m')};
        },
        changeWorkPassword:async(parent, {login, password, newPassword}, {models, secret})=>{
            const work = await models.Work.findOne({workId:login});
            if(!work){
                throw new UserInputError("No User Found");
            }
            const isValid = await models.Work.verifyHash(password, work.password);
            if(!isValid){
                throw new AuthenticationError("Invalid Password");
            }
            return work.update({$set:{password:hashPassword(newPassword)}})
        }
    },
    Work:{
        ref:async(worker, args, {models})=>{
            return await models.User.findById(worker.ref)
        },
        shop:async(worker, args, {models})=>{
            return await models.Shop.findById(worker.shopId)
        }
    }
};
