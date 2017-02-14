var express = require('express');
var morgan = require('morgan');
var app = express();

var PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static('static'));

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT + '...');
});
