const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require('morgan');
const server = express();

function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

function httpLogger(req, res, next){
  console.log(
    `The Logger: [${new Date().toISOString}].${req.method} t0 ${req.url}`
  )}

  function gateKeeper(req, res, next) {
    // data can come in the body, url parameters, query string, headers
    // new way of reading data sent by the client
    const password = req.headers.password || '';
    if (password.toLowerCase() === '') {
      res.status(400).json('please enter a password')
    }
    if (password.toLowerCase() === 'mellon') {
      next();
    } else {
      res.status(400).json({ you: 'cannot pass!!' });
    }
  }
  

//global middleware
server.use(helmet());
server.use(morgan('dev'));
server.use(gateKeeper);
server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
