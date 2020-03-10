import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'node-fetch';

import App from '../src/App'

const PORT = 8080;
const app = express();
const router = express.Router();

app.use('/:id', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");

  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    const CONTACT_URL = `https://my-json-server.typicode.com/dujuanxian/contacts-api/css/${req.params.id}`;
    fetch(CONTACT_URL)
      .then(res =>  res.json())
      .then(body => {
        return res.send(
          data.replace(
            '<div id="root"></div>',
            `<div id="root">
              ${ReactDOMServer.renderToString(<App style={body.result}/>)}
             </div>
            `
          )
        )
      });
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(router);

app.listen(PORT, () => {
  console.log(`SSR Eggy is running on port ${PORT}`)
});
