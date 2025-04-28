const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use('/', routes);

module.exports = app;
