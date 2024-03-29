const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../util/generatetoken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        picture,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Error Occurred...');
    }

    res.json({
        name,
        email,
        pic,
    });
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid Email or Password...');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.picture = req.body.picture || user.picture;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            picture: updatedUser.picture,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, authUser, updateUserProfile };
