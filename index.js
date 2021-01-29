const app = require('./app');

Error.stackTraceLimit = 3;
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
});
app.listen(1080, ()=>{
    console.log('app running on: 1080...');
})
process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!!',err.code, err.name, err.message, err.stack);
    process.exit(1);
});