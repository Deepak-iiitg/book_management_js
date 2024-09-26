const errorHandler = (error,req,res,next)=>{
    console.log(error.stack || error.message);
    
    return res.status(error.status || 500).json({message:error.message || 'Internal server error'});
}

module.exports = {errorHandler};
