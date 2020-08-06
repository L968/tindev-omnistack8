const mongoose = require('mongoose');
const axios = require('axios');
const Dev = mongoose.model('Dev');

module.exports = {

    async index(req, res) {
        const { userid: userId } = req.headers;

        const loggedUser = await Dev.findById(userId);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: loggedUser } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes } },
            ],
        });

        return res.json(users);
    },

    async create(req, res) {
        const { username } = req.body;

        if (username) {
            const userExists = await Dev.findOne({ user: username });

            if (userExists) {
                return res.status(409).json({ message: 'This user already exists' })
            }

            const response = await axios.get(`https://api.github.com/users/${username}`);

            const { name, bio, avatar_url: avatar } = response.data;

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            });

            return res.json(dev);
        } else {
            return res.status(400).json({ message: 'Username required' })
        }
    },

}