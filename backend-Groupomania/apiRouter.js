//Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl')
const messagesCtrl = require('./routes/messagesCtrl')
const likesCtrl = require('./routes/likesCtrl')
const multer = require('./utils/multer-config')

// Router
exports.router = (() => {
    const apiRouter = express.Router();


// Users routes
apiRouter.route('/users/register/').post(usersCtrl.register);
apiRouter.route('/users/login/').post(usersCtrl.login);
apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
apiRouter.route('/users/me/').delete(usersCtrl.deleteUserProfile);

// Messages routes
apiRouter.route('/messages/new/').post(multer, messagesCtrl.createMessage);
apiRouter.route('/messages/').get(messagesCtrl.listMessages);
apiRouter.route('/messages/:messageId').delete(messagesCtrl.deleteMessage);

// Likes routes
apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

return apiRouter;

})();