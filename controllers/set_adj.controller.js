const { setAdjService } = require('../services/set_adj.service')

const setAdj = async (req, res, next) => {
    try {
        bar_id = req.body.bar_id
        adj_list = req.body.adj_list

        console.log(adj_list)

        await setAdjService(bar_id, adj_list).then(
            res.sendStatus(200)
        );
        next()
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    setAdj
}
