module.exports = {

    async create(req, res) {
        const { loggedDev, targetDev } = req;

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocketId = req.connectedUsers[loggedDev._id];
            const targetSocketId = req.connectedUsers[targetDev._id];

            if (loggedSocketId) {
                req.io.to(loggedSocketId).emit('match', targetDev);
            }

            if (targetSocketId) {
                req.io.to(targetSocketId).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    },

}