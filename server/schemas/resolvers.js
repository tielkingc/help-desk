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
            return User.find()
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

            const user = User.findOne({ username })
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
        }
    }
}

module.exports = resolvers;