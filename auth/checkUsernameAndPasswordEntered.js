module.exports = (req, res, next) => {
    
    if (!req.body || !req.body.username || !req.body.password )
        { res.status(400).json({message: "Username and password are both required."}) }

    else
        { next(); }

}