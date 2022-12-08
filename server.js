const express = require('express') 
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const { required } = require('nodemon/lib/config');
const app = express();
 app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json());
 require ('./routes/webhook_verify') (app);
app.listen(app.get('port'), function() { 
  const url = 'http://localhost:' + app.set('port'); 
  console.log("Application en cours d'exécution sur le port : ", app.get('port'));
});
