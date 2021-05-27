const express = require('express')

module.exports = () =>{
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded())

    app.use('/', require('../routes'));

    return app;
}