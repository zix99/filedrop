#!/usr/bin/env node
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const path = require('path');
const config = require('./config');
const log = require('./log');

const fsp = {
  readdir: util.promisify(fs.readdir),
  stat: util.promisify(fs.stat),
};

if (config.dev) {
  log.warn('Running in dev mode');
}

const upload = multer({
  dest: 'tmp/',
});

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: config.dev,
});

app.use(morgan('combined', { stream: log.stream }));

app.use(express.static('public'));
app.use('/files', express.static(config.target));

app.post('/file', upload.single('file'), (req, res) => {
  fs.rename(req.file.path, path.join(config.target, req.file.originalname), () => {
    res.send('OK');
  });
});

app.get('/', (req, res) => {
  fsp.readdir(config.target)
    .then(files => {
      return Promise.all(files.map(filename => {
        return fsp.stat(path.join(config.target, filename))
          .then(stat => ({
            stat, filename,
          }));
      }));
    }).then(files => {
      files.sort((a, b) => a.stat.ctime < b.stat.ctime ? 1 : -1);
      res.render('index.html', { files });
    }).catch(err => {
      res.status(500).send(err);
    });
});

app.use((req, res) => {
  res.redirect('/');
});

app.listen(config.port, () => {
  log.info(`Listening on http://0.0.0.0:${config.port}`);
});
