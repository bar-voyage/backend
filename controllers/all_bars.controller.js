const { getAllBarsService } = require('../services/all_bars.service')

const getAllBars = async (req, res, next) => {
   
    try {
        const result = await getAllBarsService()
        // const result = await getAllBarsService().then(result => {
        //     console.log(result)
        //     res.send(result)
        //         //.send(result)
        // });
        res.send(result)
        next()
         // res.sendStatus(200)
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
        next()
    }
}

module.exports = {
    getAllBars
}