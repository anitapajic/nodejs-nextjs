const jwt =  require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

module.exports = generateToken;