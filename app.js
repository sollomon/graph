const express = require('express');
const {ApolloServer, AuthenticationError} = require('apollo-server-express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Dataloader = require('dataloader');
const {createServer} = require('http');
const {execute, subscribe} = require('graphql');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const http = require('http');

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const secret = require('./config').secret;

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost/apollo');
mongoose.connection.once('open', ()=>{
  console.log('database connected')
});

const batchUsers = async (keys, models)=>{
  const users = await models.User.find({_id:{$in:keys,}});
  return keys.map(key=>users.find(user=>user.id===key))
}

const signInError = "Your Session Expired, Please Sign In Again";

const getShops = async req =>{
  const token = req.headers['shops'];
  if(token){
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

const getWork = async req =>{
  const token = req.headers['works'];
  if(token){
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

const getMe = async req =>{
  const token = req.headers['me'];
  console.log(req.rawHeaders['me'])
  if(token){
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

const server = new ApolloServer({
  subscriptions:{
    onConnect:()=>{
      console.log('client connected')
    },
    onDisconnect:()=>{
      console.log('client disconnected')
    }
  },
  typeDefs:schema,
  resolvers,
  context: async ({req, connection})=>{
    if(connection){
      return{
        models
      }
    }
    if(req){
      const me =await getMe(req);
      const myShops= await getShops(req);
      const myWork = await getWork(req);

      return {
        models,
        me,
        myShops,
        myWork,
        secret:secret,
        loaders:{
          user:new Dataloader(keys=>batchUsers(keys, models))
        }
      };
    }
  },
});

server.applyMiddleware({app, path: '/client'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use('/user',(req, res, next)=>{
  res.status(200).json({
    message:"passed"
  })
});



httpServer.listen({port:3002},()=>{

  console.log("Apollo server 3002")
})
