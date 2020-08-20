module.exports = {

    async create(req, res) {
        const { loggedDev, targetDev } = req;

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    },

}