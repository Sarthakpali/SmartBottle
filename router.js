'use strict';
const devicemasteridRoutes = require('./routes/devicemacid.router')
const registerRoutes = require('./routes/register.router')
const deviceRoutes = require('./routes/devicedata.router')
const authRoutes = require('./routes/auth.router')
module.exports = (app) => {
    app.use('/devicemacid', devicemasteridRoutes);
    app.use('/register', registerRoutes);
    app.use('/devicedata', deviceRoutes);
    app.use('/auth', authRoutes)
};