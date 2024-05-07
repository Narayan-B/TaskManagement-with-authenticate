const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.status(400).json('Token is required');
    }
    try {
        const tokenData = jwt.verify(token, process.env.SECRETKEY);
        //console.log('Token Data:', tokenData); // Log token data
        req.user = {
            id: tokenData.id,
            role: tokenData.role // Extract and set the role property
        };
        //console.log(req.user)
        //console.log('User:', req.user); // Log user object
        next();
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = authenticateUser;
