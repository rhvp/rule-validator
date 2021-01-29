

module.exports = (err, req, res, next)=>{
    
    console.error(err.name, err.message, err.stack);

    
    res.status(err.statusCode || 500).json({
        message: err.message,
        status: 'error',
        data: null
    });
    
}