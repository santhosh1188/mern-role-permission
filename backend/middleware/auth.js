const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user.id).populate({
            path: 'roles',
            populate: { path: 'permissions' }
        });

        req.user.permissions = user.roles.flatMap(role => role.permissions.map(p => p.name));
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
