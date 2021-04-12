module.exports = app =>{
    app.use('/api/rangeofValues', require('../routes/rangeofValues.routes'));
}