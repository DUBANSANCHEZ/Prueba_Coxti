module.exports = app =>{
    app.use('/api/register', require('../routes/register.routes'));
}