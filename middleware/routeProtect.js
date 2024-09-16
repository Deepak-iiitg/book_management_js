require('dotenv').config();
const jwt  =  require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;
async function isTokenCorrect(req,res,next){
     try{
         const token = req.headers.token;
         if(token){
             const isValid = await jwt.verify(token,secret_key);
             console.log(secret_key);
             console.log(isValid);
             if(isValid){
                next();
             }else{
                error.message = 'Unauthorized credentials';
                error.status = 401;
                next(error);
             }
         }else{
            error.message = 'Unauthorized credentials';
                error.status = 401;
                next(error);
         }
     }catch(error){
        error.status = 401;
        next(error);
     }
}

module.exports = {isTokenCorrect};