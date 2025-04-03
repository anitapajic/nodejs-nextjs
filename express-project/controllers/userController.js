const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const isValidEmail = require('../helpers/validations')
const generateToken = require('../helpers/generateToken')

const registerUser = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    if (!isValidEmail(email)) {
        res.status(400);
        throw new Error("Invalid email format!");
    }

    const userExists = await User.findOne({email}).lean();
    if (userExists) {
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    if (!user) {
        res.status(400);
        throw new Error("User data is not valid!");
    } 

    res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
    });

    
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required!")
    }
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Invalid email or password!");
    }

    const accessToken = generateToken(user);

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Successfully logged in" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const logout = asyncHandler( async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Successfully logged out" });
})

module.exports = {
    registerUser, 
    loginUser, 
    currentUser, 
    logout }