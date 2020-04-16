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
const secret = require('../config').secret;

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost/accounts');
mongoose.connection.once('open', ()=>{
  console.log('database connected')
});

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
        return {
          models,
          secret:secret,
        };
    },
});

server.applyMiddleware({app, path: '/client'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port:5000},()=>{
    console.log("Accounts server 5000")
})