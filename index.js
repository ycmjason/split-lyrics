var express = require('express');
var morgan = require('morgan');
var grab_text = require('grab-text');
var app = express();

var PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static('static'));

app.get('/api/grabtext', (req, res) => {
  var url = req.query.url;
  grab_text(url).then(text => res.json({
    url: url,
    text: text
  }));
});

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT + '...');
});
