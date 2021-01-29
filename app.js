const express = require('express');
const app = express();
const controller = require('./controller');
const errorHandler = require('./errorController');

app.use(express.json());

app.get('/', controller.get);
app.post('/validate-rule', controller.validate)

app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource that is not on this server.`, 404);
    next(err);
});
app.use(errorHandler);
module.exports = app;