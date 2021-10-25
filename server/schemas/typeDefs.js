const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        username: String!
        password: String!
        createdAt: String!
        admin: Boolean!
        token: String!
    }

    type Ticket {
        id: ID!
        ticketNumber: Int!
        title: String!
        createdAt: String!
        category: String!
        subCategory: String
        status: String!
        priority: String!
        assignedTo: String!
        submitUser: String!
        body: String!
    }

    type Query {
        getUsers: [User]
        getUser(id:ID): User
    }

    input RegisterInput {
        first_name: String!
        last_name: String!
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
        admin: Boolean
    }

    input TicketInput {
        title: String!
        category: String!
        subCategory: String
        priority: String!
        submitUserId: ID!
        body: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User
        login(username: String!, password: String!): User
        createTicket(ticketInput: TicketInput): Ticket
    }
`