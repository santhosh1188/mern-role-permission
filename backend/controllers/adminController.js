const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const bcrypt = require('bcryptjs');

exports.createPermission = async (req, res) => {
    try {
        const permission = new Permission({ name: req.body.name });
        await permission.save();
        res.json(permission);
    } catch (err) {
        res.status(400).json({ msg: 'Permission already exists' });
    }
};

exports.createRole = async (req, res) => {
    const { name, permissionIds } = req.body;
    const role = new Role({ name, permissions: permissionIds });
    await role.save();
    res.json(role);
};

exports.createUser = async (req, res) => {
    const { username, password, roleIds } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, roles: roleIds });

    await user.save();
    res.json(user);
};
