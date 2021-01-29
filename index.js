require('dotenv').config();
const app = require('./app');

Error.stackTraceLimit = 3;
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
});
let port = 1080 || process.env.PORT;
app.listen(port, ()=>{
    console.log('app running on: ' + port);
})
process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!!',err.code, err.name, err.message, err.stack);
    process.exit(1);
});