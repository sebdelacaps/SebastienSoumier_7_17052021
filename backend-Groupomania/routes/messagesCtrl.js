// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils')

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
    createMessage : (req, res) => {

        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth);

        // Params
        const title = req.body.title;
        const content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({'error' : 'missing parameters'})
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({'error': 'invalid parameters'})
        }

        models.User.findOne({
            where: { id: userId }
        })
        .then((userFound) => {
            if (userFound) {
                models.Message.create({
                    title : title,
                    content: content,
                    likes : 0,
                    UserId : userFound.id
                })
                .then((newMessage) => {
                    res.status(201).json({newMessage})
                })
                .catch(() => res.status(500).json({'error': 'cannot post message'}))
            } else {
                res.status(404).json({'error': 'user not found'})
            }
        })
        .catch((err) => {
            res.status(500).json({'error': 'unable to verify user'})
        })
},
listMessages: function(req, res) {
    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }).then((messages) => {
      if (messages) {
        res.status(200).json({ messages });
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  }

}