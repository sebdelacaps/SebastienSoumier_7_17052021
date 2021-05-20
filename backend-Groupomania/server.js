// Imports
const express = require('express');
const apiRouter = require('./apiRouter').router;

// Instantiate server
const server = express()

// Body Parser configuration
server.use(express.json());

// Configure Routes
server.get('/', (req, res) => {
 res.setHeader('Content-Type', 'text/html')
 res.status(200).send('<h1> Bonjour</h1>')
})

server.use('/api/', apiRouter);

// Launch server
server.listen(3000,  () =>{
    console.log('Serveur en écoute')
})