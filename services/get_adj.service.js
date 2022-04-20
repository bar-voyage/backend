const { getAdjDb } = require('../db/get_adj.db')

const getAdjService = async (bar_id) => {
    try {        
        adj_with_counts = await getAdjDb(bar_id)
        console.log("length = ", adj_with_counts.length)
        var adj_list = []
        for(i = 0; i < adj_with_counts.length && i < 3; i++) {
            console.log("i = ", i)
            console.log(adj_with_counts[i].adj_name)
            adj_list.push(adj_with_counts[i].adj_name)
        }
        console.log(adj_list)

        return adj_list
        
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getAdjService
}