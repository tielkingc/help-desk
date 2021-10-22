const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require('./schemas');
const { MONGODB } = require('./config');

const PORT = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.log(err);
    })