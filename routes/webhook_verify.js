const processPostback = require('../processes/postback'); 
const processMessage = require('../processes/messages');
module.exports = function(app, chalk){ 
  app.get('/webhook', function(req, res) { 
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){ 
       console .log('webhook vérifié'); 
       res.status(200).send(req.query['hub.challenge']); 
    } else { 
        console.error('échec de la vérification. Incompatibilité de jeton.'); 
        res.sendStatus (403); 
     } 
  }); 
  
  app.post('/webhook', function(req, res) { 
    //vérification de l'abonnement à la page.
     if (req.body.object === 'page'){ 
       
       /* Itérer sur chaque entrée, il peut y avoir plusieurs entrées 
       si les rappels sont groupés. */
       req.body.entry.forEach(function(entry) { 
       // Itérer sur chaque événement de messagerie
           entry.messaging.forEach(function(event) { 
          console.log(event); 
          if (event.postback){ 
             processPostback(event); 
          } else if (event.message){ 
             processMessage(event); 
          } 
      }); 
    }); 
    res.sendStatus(200); 
   } 
  }); 
}