import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App'

const PORT = 8080;
const app = express();
const router = express.Router();

app.use('/:id', (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(router);

app.listen(PORT, () => {
  console.log(`SSR Eggy is running on port ${PORT}`)
});


