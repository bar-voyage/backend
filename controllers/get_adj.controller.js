const { getAdjService } = require('../services/get_adj.service')

const getAdj = async (req, res, next) => {
    try {
        bar_id = req.body.bar_id

        await getAdjService(bar_id).then( adj_list => {
            console.log("sending adjectives")
            // console.log(adj_list)
            res.send(adj_list)
        });
        next()
    }
    catch (e) {
        console.log(e.message)
        console.log("sending 500")
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getAdj
}
