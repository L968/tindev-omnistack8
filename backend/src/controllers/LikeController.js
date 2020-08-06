module.exports = {

    async create(req, res) {
        const { loggedDev, targetDev } = req.app.locals;

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Match');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    },

}