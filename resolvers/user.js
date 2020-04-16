const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {combineResolvers} = require('graphql-resolvers');
const {isAdmin} = require('./authorization');

const createuToken =async (user, secret, expiresIn) =>{
    const {id, fName, lName, username}= user;
    return await jwt.sign({id, fName, lName, username}, secret, {expiresIn});
};

const createwToken = async(workids, secret,expiresIn)=>{
    return await jwt.sign({workids}, secret, {expiresIn});
}

const createsToken = async(shopids, secret, expiresIn)=>{
    return await jwt.sign({shopids}, secret, {expiresIn});
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}


module.exports ={
    Query: {
        users: async (parent, args, { models }) => {
          return await models.User.find({});
        },
        yourusers:async(parent, {ids}, {models})=>{
            return await models.User.find({_id:{$in:ids}})
        },
        user: async (parent, { id }, { models }) => {
          return await models.User.findById(id);
        },
      },
      Mutation:{
          signUp:async(parent,{username,lName, fName, email,phone, password, address, location},{models, secret})=>{
            let newuser = new models.User({
                username:username,
                fName:fName,
                lName:lName,
                password:hashPassword(password),
            });

            return await newuser.save().then(async user=>{
                let contact = new models.Contact({
                    ref:user.id,
                    email:email,
                    phone:phone,
                    location:location,
                    address:address,
                });
                await contact.save()
                return {uToken:createuToken(user, secret, '30m')};
             })
          },
          signIn:async(parent, {login, password,},{models,secret},)=>{
              const contact = await models.Contact.findOne({email:login});

              if(!contact){
                  throw new UserInputError(
                      "No User found"
                  );
              }
              const user = await models.User.findById(contact.ref);
              if(!user){
                  throw new UserInputError("Error Happenned")
              }
              const isValid = await models.User.verifyHash(password, user.password);

              if(!isValid){
                  throw new AuthenticationError('Invalid Password');
              }

              const works  =  await models.Work.find({ref:user.id},{_id:1})
              const workids = works.map(item=>{
                  return item._id;
              })
              const workshops = await models.Shop.find({workers:workids})
              const workshopids = workshops.map(item=>{
                  return item._id;
              })

              const shops = await models.Shop.find({owner:user.id},{_id:1});
              const shopids = shops.map(item=>{
                  return item._id;
              })

              return  {
                  uToken:createuToken(user, secret, '30m'),
                  wToken:createwToken(workids, secret, '30m'),
                  sToken:createsToken(shopids, secret, '30m'),
            };
          },
          deleteUser:combineResolvers(
          isAdmin,
          async(parent, {id}, {models})=>{
              return await models.User.findOneAndDelete(id);
          }),
      },
      User:{
          contact:async (user, args, {models})=>{
              return await models.Contact.findOne({ref:user.id})
          },
          goods:async (user, args, {models})=>{
              return await models.Good.find({_id:user.goods})
          },
          shops:async (user, args, {models})=>{
              return await models.Shop.find({_id:user.shops})
          },
          accounts:async(user, args, {models})=>{
              return await models.Account({ref:user.id})
          },
          photos:async(user, args, {models})=>{
              return await models.Photo.find({ref:user.id})
          },
      }
}
