const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require("apollo-server");

require('dotenv').config();

const { validateRegisterInput, validateLoginInput } = require('../../util/Validators');
const User = require('../../models/User');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(
            _,
            {username, password},
        ) {
            const { valid, errors } = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('Validation error', { errors })
            }

            const user = await User.findOne({ username });

            if(!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrpyt.compare(password, user.password);
            if(!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(
            // parent field
            _,
            //args
            {
                registerInput: { username, email, password, confirmPassword }
            },
            // context,
            // info
        ) {
                // Validate user data
                const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

                if(!valid){
                    throw new UserInputError('Validation error', { errors })
                }
                // Make sure user doesn't exist
                const user = await User.findOne({ username });

                if(user){
                    throw new UserInputError('Username is taken', {
                        errors: {
                            username: 'This username is taken'
                        }
                    })
                }
                // Hash password and create auth token
                password = await bcrpyt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                });
                const res = await newUser.save();

                const token = generateToken(res);

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
        }
    }
};