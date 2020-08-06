const mongoose = require('mongoose');
const Dev = mongoose.model('Dev');

module.exports = {

    create: async (req, res, next) => {
        const { userid: userId } = req.headers;
        const { devId } = req.params;
        let loggedDev, targetDev;

        if (!userId) {
            return res.status(400).json({ message: 'User id required' });
        }

        if (!devId) {
            return res.status(400).json({ message: 'Dev id required' });
        }

        try {
            loggedDev = await Dev.findById(userId);

            if (!loggedDev) throw Error;
        } catch (error) {
            return res.status(400).json({ message: `The user id ${userId} doesn't exists` });
        }

        try {
            targetDev = await Dev.findById(devId);

            if (!targetDev) throw Error;
        } catch (error) {
            return res.status(400).json({ message: `The target dev id ${devId} doesn't exists` });
        }

        if (loggedDev.likes.includes(targetDev._id)) {
            return res.status(409).json({ message: 'You already liked this dev' });
        }

        if (loggedDev.dislikes.includes(targetDev._id)) {
            return res.status(409).json({ message: 'You already disliked this dev' });
        }

        req.app.locals.loggedDev = loggedDev;
        req.app.locals.targetDev = targetDev;

        next();
    },

}