const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { name } = req.body;

        const userExists = await User.findOne({ name: name.toLowerCase() });

        if (userExists) {
            return res.json(userExists);
        } else {
            const user = await User.create({
                name
            });

            return res.json(user);
        }

    },

    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    }
}