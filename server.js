const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const routes = require('./src/routes/router');
const server = express();
const connectDB = require('./config/connector'); 

// Load config
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

connectDB(); 

// Middleware for parsing requests
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS and security headers
server.use(cors());
//server.use(helmet());

// Set EJS as the view engine
server.set('view engine', 'ejs');

// Logging (only in development)
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

// Sessions with MongoDB store
server.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// // Set global user variable for views
// server.use(function (req, res, next) {
//   console.log('call me')
//   res.locals.user = req.user || null;
//   next();
// });

server.use(routes);
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`[INFO] Server started on port ${port}`);
  console.log(`[HOST] http://localhost:${port}/`);
});
