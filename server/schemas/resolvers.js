const { User, Ticket } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const { SECRET_KEY } = require('../config')
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
}

const resolvers = {
    Query: {
        getUsers: async() => {
            return await User.find()
            // console.log(user.length);
        },

        getTickets: async() => {
            return await Ticket.find();
        }
    },

    Mutation: {
        register: async(_, { registerInput: { first_name, last_name, email, username, password, confirmPassword }}) => {
            const { valid, errors } = validateRegisterInput(
                first_name,
                last_name,
                email,
                username,
                password,
                confirmPassword
            );

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            
            password = await bcrypt.hash(password, 12)
            
            const newUser = await User.create({
                first_name,
                last_name,
                email,
                username,
                password,
                admin: false,
                createdAt: new Date().toISOString()});

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },

        login: async(_, { username, password }) => {
            const { valid, errors } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            
            const user = await User.findOne({ username })

            if (!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = generateToken(user)

                return {
                    ...user._doc,
                    id: user._id,
                    token
                };
            } else {
                throw new UserInputError('Wrong credentials')
            }
        },

        createTicket: async(_, { ticketInput: { title, category, subCategory, priority, submitUserId, body }}) => {
            const ticket = await Ticket.find()

            if (!ticket) {
                ticketLen = 1
            } else {
                ticketLen = ticket.length + 1
            }
            
            const submitUser = await User.findById(submitUserId)
            console.log(submitUser.username)
            
            const newTicket = await Ticket.create({
                title,
                body,
                ticketNumber: ticketLen,
                category,
                subCategory,
                priority,
                submitUser: submitUser.username,
                createdAt: new Date().toISOString(),
                status: 'New',
                assignedTo: 'None'
            })

            return newTicket
        },

        assignToAdmin: async (_, { username, ticketNumber }) => {
            const ticket = await Ticket.findOneAndUpdate(
                { ticketNumber },
                { assignedTo: username },
                { new: true}
            )

            return ticket
        }
    }
}

module.exports = resolvers;