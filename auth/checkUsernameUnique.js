const database = require("./auth-model");

module.exports = (req, res, next) => {

    console.log("finding users...", req.body.username)

    database.getUserBy({username: req.body.username})
        .then(existingUsersFound => {

            // username already exists in database
            if (existingUsersFound)
                { res.status(400).json({message: "Username already taken."})}

            // username is unique
            else
                { next(); }
        })
        .catch(error => {
            res.status(500).json({message: "server error in retrieving username", error})
        })

}