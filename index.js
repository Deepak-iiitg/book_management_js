require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./models/dbConnection').main;
const PORT = process.env.PORT;

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const logger = require("./utils/logger");
const morgan  =  require("morgan");

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


dbConnection();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler').errorHandler;
app.use('/api',authRoutes.router);
app.use('/api/book',bookRoutes.router);
app.use(errorHandler);
app.listen(PORT,()=>{console.log('server running on port 8080')})
