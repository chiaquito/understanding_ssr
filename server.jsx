import express from 'express';
import { renderToString } from 'react-dom/server';
import { HomePage, notNextServerSideProps } from './app/pages';
import { document } from './utils/document';
import React from 'react';
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname)));
app.get('/', async (req, res) => {
  const initialData = await notNextServerSideProps(fetch);
  const htmlContent = renderToString(<HomePage {...initialData.props}/>);
  // htmlContent: <div><h1>Home Page</h1></div>
  // console.log(htmlContent)
  const html = document(htmlContent, initialData.props);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});