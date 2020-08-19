const mongoose = require('mongoose');
const axios = require('axios');
const Dev = mongoose.model('Dev');

const api = axios.create({
    validateStatus: (status) => {
      return status >= 200 && status < 500;
    },
});

module.exports = {

    async index(req, res) {
        const { userid: userId } = req.headers;

        const loggedUser = await Dev.findById(userId);

        if (!loggedUser) {
            return res.status(404).json({ message: 'Logged user not found' });
        }

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

        if (!username) {
            return res.status(400).json({ message: 'Username required' });
        }

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await api.get(`https://api.github.com/users/${username}`);

        if (response.status === 404) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name: name || username,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    },

}