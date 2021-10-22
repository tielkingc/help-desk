const { User, Ticket } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = require('../config')

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
        register: async(_, 
            { registerInput: { first_name, last_name, email, username, password, confirmPassword }}) => {
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
            const user = await User.findOne({ username })

            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = generateToken(user)

                return {
                    ...user._doc,
                    id: user._id,
                    token
                };
            } else {
                console.log('Incorrect credentials!')
            }
        }
    }
}

module.exports = resolvers;