// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils')
const models = require('../models');
const { restart } = require('nodemon');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;


// Routes
module.exports = {
    register: (req, res) => {
        
        // Params
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        if (email == null || username == null || password == null ) {
            return res.status(400).json({ message : 'missing parameters'})
        }

        // Validation controls
        if (username.length >= 13 || username.length <=4) {
            return res.status(400).json({ message : 'wrong username (must be length 5 - 12)'})
        }

        // Regex
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message : 'email is not valid'})
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ message : 'password invalid (more than 8 chars & at least one number & at least one special character'})
        }


        models.User.findOne({
            attributes: ['email'],
            where: {email: email}
        })
        .then((userFound) =>{
            if (!userFound) {
                
                bcrypt.hash(password, 10) 
                .then((hash) => {
                    const newUser = models.User.create({
                      email: email,
                      username: username,
                      password: hash,
                      isAdmin: 0,
                    })
                    newUser
                    .then((newUser) => res.status(201).json({ message: "User was registered successfully!"  }))
                    .catch((error) => res.status(400).json({ error }));
                })
                .catch(() => res.status(500).json({ message: 'cannot add user' }));
                
            } else {
                return res.status(409).json({message : 'user already exist'})
            }    
          })
        .catch(()=> {
            return res.status(500).json({ 'error': 'unable to verify user'})
        })
            },


    login: (req, res) => {

        // Params
        const email = req.body.email;
        
        const password = req.body.password;
        if (email == null ||  password == null ) {
            return res.status(400).json({message : 'missing parameters'})
        }

 // TODO REGEX validation


 models.User.findOne({
    where: {email: email}
})
.then((userFound) =>{
    if (userFound) {
        
        bcrypt
        .compare(req.body.password, userFound.password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({ message : 'Invalid Password!' });
          }
          res.status(200).json({
            userId: userFound.id,
            token: jwtUtils.generateTokenForUser(userFound),
          });
        })
        .catch((error) => res.status(500).json({ error }));
        
    } else {
        return res.status(404).json({ message : 'user not exist in DB'})
    }    
  })
.catch(()=> {
    return res.status(500).json({ message : 'unable to verify user'})
})
    },


    getUserProfile: (req, res)=> {
        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({'error': 'wrong token'})
        }

        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
        .then((user) => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found'})
            }
        })
        .catch((err) => {
            res.status(500).json({'error': 'cannot fetch user'})
        })
    },


    updateUserProfile: (req, res) => {
        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth);

        
        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        }).then((userFound) => {
            
            if (userFound) {
                userFound.update({
                    ...req.body    
                },  {where: { id: userId }})
                .then((userUpdated) => res.status(201).json({userUpdated}))
                .catch(() => res.status(500).json({'error': 'cannot update user'}))
            } else {
                res.status(404).json({ 'error': 'user not found'})
            }
        })
        .catch((err) => {
            res.status(500).json({'error': 'unable to verify user'})
        })


    },

    deleteUserProfile: (req, res)=> {
        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({'error': 'wrong token'})
        }

        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: userId }
        })
        .then((user) => {
            if (user) {

                models.User.destroy( {where: { id: userId }})
               .then(() => res.status(200).json({ message: "User Deleted!" }))
               .catch((error) => res.status(400).json({ error }));

            } else {
                res.status(404).json({ 'error': 'user not found'})
            }
        })
        .catch((err) => {
            res.status(500).json({'error': 'cannot fetch user'})
        })
    },

    }
