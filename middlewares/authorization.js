// authorization middleware
const authorizeUser = (permissions) => {
    return (req, res, next) => {
        if (permissions.includes(req.user.role)) {
            next();
        } else {
            return res.status(403).json({ error: 'You do not have access to this resource' });
        }
    };
};

module.exports = authorizeUser;
