require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/userModels').userModel;
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

async function register(req, res, next) {
   try {
      const existing_user = await User.find({ email: req.body.email });

      if (existing_user.length != 0) {
         error.status = 400;
         error.message = 'user already exist';
         next(error);
      }

      console.log('register method');
      const password = req.body.password;
      if (password.length < 6) {
         error.status = 400;
         error.message = 'password length should be atleast 6';
         next(error);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      req.body.password = hashedPassword;
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({
         message: 'user created sucessfully'
      });
   } catch (error) {
      next(error);
   }
}
async function login(req, res, next) {
   try {
      console.log('login method', req.body);
      const password = req.body.password;
      const user = await User.find({ email: req.body.email });

      if (user.length > 0) {
         console.log(user);
         console.log(password + " hashed password " + user[0].password);
         const isMatchPassword = await bcrypt.compare(password, user[0].password);

         console.log('after bcrypt compare');
         if (isMatchPassword) {
            const jwt_token = jwt.sign({ user_id: user[0]._id, user_email: user[0].email },
               secret_key
            );
            return res.status(200).json({
               message: 'login sucess',
               token: jwt_token
            });
         } else {
            error.status = 404;
            error.message = 'email or password are invalid';
            next(error);
         }
      } else {
         error.status = 404;
         error.message = 'email or password are invalid';
         next(error);
      }
   } catch (error) {
      next(error);
   }
}

module.exports = { login, register };