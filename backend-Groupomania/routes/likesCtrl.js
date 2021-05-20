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
        attributes: ['email'],
        where: { id: messageId}
    })
    .then((messageFound) => {
        if (messageFound) {
            models.user.findOne({
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
                            messageFound.addUser(userFound, { isLike: LIKED})
                            .then((messageFound) => {
                                messageFound.update({
                                    likes: messageFound.likes + 1,
                                })
                                .then(() => res.status(201).json({ messageFound }))
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
                                .then((messageLike) => res.status(201).json({ messageFound }))
                                .catch((err) => res.status(500).json({ 'error': 'cannot update user reaction' }))
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

}

}