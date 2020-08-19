const mongoose = require('mongoose');
const Dev = mongoose.model('Dev');

module.exports = {

    create: async (req, res, next) => {
        const { userid: userId } = req.headers;
        const { devId } = req.params;
        let loggedDev, targetDev;

        if (!userId) {
            return res.status(400).json({ message: '`userid` header required' });
        }

        if (!devId) {
            return res.status(400).json({ message: '`devId` param required' });
        }

        try {
            loggedDev = await Dev.findById(userId);
            targetDev = await Dev.findById(devId);

            if (!loggedDev || !targetDev) {
                throw Error;
            }
        } catch (error) {
            return res.status(400).json({ message: `The id doesn't exists` });
        }

        if (loggedDev.likes.includes(targetDev._id)) {
            return res.status(409).json({ message: 'You already liked this dev' });
        }

        if (loggedDev.dislikes.includes(targetDev._id)) {
            return res.status(409).json({ message: 'You already disliked this dev' });
        }

        req.loggedDev = loggedDev;
        req.targetDev = targetDev;

        return next();
    },

}