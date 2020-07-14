module.exports = {
    date(timestamp) {
        const currentTimestamp = new Date(timestamp)
    
        const day = currentTimestamp.getDate()
        const month = currentTimestamp.getUTCMonth() + 1 
        const year = currentTimestamp.getUTCFullYear()
    
        return `${year}-${month}-${day}`
    }
}