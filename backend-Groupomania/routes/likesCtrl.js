// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
module.exports = {

likePost: (req, res) => {

    // Getting auth header
    const headerAuth = req.headers['authorization']
    const userId = jwtUtils.getUserId(headerAuth);

    // Params
    const messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' })
    }

    models.Message.findOne({
        where: { id: messageId }
    }) 
    .then((messageFound) => {
       
        if (messageFound) {
            models.User.findOne({
                where: { id: userId }
            })
            .then((userFound) => {
              
                if (userFound) {
                  
                   models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                       
                    }) 
                    .then((userAlreadyLikedFound) => {
                       
                        if (!userAlreadyLikedFound) {
                            
                            models.Like.create({
                                messageId: messageId,
                                userId: userId,
                                isLike: LIKED
                            })

                            // messageFound.update({
                            //     likes: messageFound.likes + 1,
                            // })
                            // .then((messageUpdated) => res.status(201).json({ messageUpdated }))
                            // .catch((err) => res.status(500).json({ 'error': 'cannot update message like counter' }))


                            .then(() => {
                                messageFound.update({
                                    likes: messageFound.likes + 1,
                                })
                                .then((messageUpdated) => res.status(201).json({ messageUpdated }))
                                .catch((err) => res.status(500).json({ 'error': 'cannot update message like counter' }))
                            })
                            .catch((err) => {
                                return res.status(500).json({ 'error': 'unable to set user reaction' })
                            })
                        } else {
                            if (userAlreadyLikedFound.isLike === DISLIKED) {
                                userAlreadyLikedFound.update({
                                    isLike: LIKED,
                                })
                                .then(() => {
                                    messageFound.update({
                                        likes: messageFound.likes + 1,
                                    })
                                    .then((messageUpdated) => res.status(201).json({ messageUpdated }))
                                    .catch((err) => res.status(500).json({ 'error': 'cannot update message like counter' }))
                                })
                                .catch((err) => {
                                    return res.status(500).json({ 'error': 'unable to set user reaction' })
                                })
                            }
                            else {
                                res.status(409).json({ 'error': 'message already liked'})
                            }
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'unable to verify if user already liked' })
                    })
                } else {
                    res.status(404).json({ 'error': 'user not exist' })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'unable to verify user'})
            })
        } else {
            res.status(404).json({ 'error': 'post already liked' })
        }

    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify message' })
    })
},

dislikePost: (req, res) => {

    // Getting auth header
    const headerAuth = req.headers['authorization']
    const userId = jwtUtils.getUserId(headerAuth);

    // Params
    const messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' })
    }

    models.Message.findOne({
        where: { id: messageId }
    }) 
    .then((messageFound) => {
       
        if (messageFound) {
            models.User.findOne({
                where: { id: userId }
            })
            .then((userFound) => {
              
                if (userFound) {
                  
                   models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                       
                    }) 
                    .then((userAlreadyLikedFound) => {
                       
                        if (!userAlreadyLikedFound) {
                            
                            models.Like.create({
                                messageId: messageId,
                                userId: userId,
                                isLike: DISLIKED
                            })
                            
                             
                                .then((messageUpdated) => res.status(201).json({ messageUpdated }))
                                .catch((err) => res.status(500).json({ 'error': 'cannot update message like counter' }))
                            
                        } else {
                            if (userAlreadyLikedFound.isLike === LIKED) {
                                userAlreadyLikedFound.update({
                                    isLike: DISLIKED,
                                })
                                .then(() => {
                                    messageFound.update({
                                        likes: messageFound.likes -1,
                                    })
                                    .then((messageUpdated) => res.status(201).json({ messageUpdated }))
                                    .catch((err) => res.status(500).json({ 'error': 'cannot update message like counter' }))
                                })
                                .catch((err) => {
                                    return res.status(500).json({ 'error': 'unable to set user reaction' })
                                })
                            }
                            else {
                                res.status(409).json({ 'error': 'message already disliked'})
                            }
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'unable to verify if user already disliked' })
                    })
                } else {
                    res.status(404).json({ 'error': 'user not exist' })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'unable to verify user'})
            })
        } else {
            res.status(404).json({ 'error': 'post already liked' })
        }

    })
    .catch((err) => {
        return res.status(500).json({ 'error': 'unable to verify message' })
    })
},



}