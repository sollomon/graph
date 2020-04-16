const {PubSub} = require('apollo-server');

const POST_EVENTS = require('./post');
const EVENTS = {
    POST:POST_EVENTS,
}
const pubsub = new PubSub();
module.exports ={
    EVENTS,
    pubsub,
};
