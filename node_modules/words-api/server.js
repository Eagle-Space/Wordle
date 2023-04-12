'use strict';

const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const Note = require('./api/models/notes');
const isDev = require('./utils').isDev;

const app = express();
const port = process.env.PORT || 3000;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.CORS_WHITELIST
};
app.use(cors(corsOptions));

//import routes
var routes = require('./api/routes/notes'); 
//register routes
routes(app);

app.listen(port);

if (isDev()) {
    console.log(chalk.blue(`nizzotes-api server started on: ${port}`));
}