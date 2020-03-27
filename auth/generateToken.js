const jwt = require("jsonwebtoken")

const jwtSecret = require("./jwtSecret");

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1h"
    }
    return jwt.sign(payload, jwtSecret, options);
}