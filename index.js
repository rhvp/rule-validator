const app = require('./app');

Error.stackTraceLimit = 3;
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
});
let port = process.env.PORT || 1080;
app.listen(port, ()=>{
    console.log('app running on: ' + port);
})
process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!!',err.code, err.name, err.message, err.stack);
    process.exit(1);
});