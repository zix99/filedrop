#!/usr/bin/env node
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const log = require('./log');

const app = express();

app.use(morgan('combined', { stream: log.stream }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(config.port, () => {
  log.info(`Listening on http://0.0.0.0:${config.port}`);
});
