// Imports
const express = require('express');
const apiRouter = require('./apiRouter').router;
const path = require('path');

// Instantiate server
const server = express()

// Body Parser configuration
server.use(express.json());

// Dipslya images folder
server.use('/images', express.static(path.join(__dirname, 'images')));

// CORS
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

server.use('/api/', apiRouter);

// Launch server
server.listen(3000,  () =>{
    console.log('Serveur en écoute')
})