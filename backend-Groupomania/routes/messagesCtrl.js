// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils')

// Constants
// const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
    createMessage : (req, res) => {

      



        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth);
        


        // Params
        // const title = req.body.title;
      
        const content = req.body.content
        const image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       
        // if (title == null || content == null) {
          if (content == null) {
           
            return res.status(400).json({'error' : 'missing parameters'})
        }

        // if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        //     return res.status(400).json({'error': 'invalid parameters'})
        // }

        models.User.findOne({
            where: { id: userId }
        })
        .then((userFound) => {
            if (userFound) {

              models.Message.create({
                    // title : title,
                    content: content,
                    likes : 0,
                    UserId : userFound.id,
                    attachment: image_url
                })
                .then((newMessage) => {
                    return res.status(201).json(newMessage)
                })
                .catch(() => res.status(500).json({'error': 'cannot post message'}))
            } else {
               return res.status(404).json({'error': 'user not found'})
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': 'unable to verify user'})
        })
},
listMessages: (req, res) => {
    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      },
    ]
    }).then((messages) => {
      if (messages) {
        return res.status(200).json( messages );
      } else {
        return res.status(404).json({ "error": "no messages found" });
      }
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ "error": "invalid fields" });
    });
  },

  deleteMessage : (req, res) => {

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
          
            if (userFound.isAdmin) {
              
               models.Message.destroy( {where: { id: messageId }})
               .then(() => res.status(200).json({ message: "Message Deleted!" }))
               .catch((error) => res.status(400).json({ error }));
  }
  else {
    res.status(202).json({ 'error': 'you have to be admin'})
  }
  
})
.catch((err) => {
  return res.status(500).json({ 'error': 'unable to verify user' })
})

} else {
  res.status(404).json({ 'error': 'post already deleted' })
}
    })
      .catch((err) => {
          return res.status(500).json({ 'error': 'unable to verify message' })
      })

  }}