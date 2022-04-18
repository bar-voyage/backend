const { getAdjService } = require('../services/get_adj.service')

const getAdj = async (req, res, next) => {
    try {
        bar_id = req.body.bar_id

        await getAdjService(bar_id).then( adj_list => {
            res.send(adj_list)
        });
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getAdj
}
