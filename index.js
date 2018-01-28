const express = require('express');
const morgan = require('morgan');
const grabLyrics = require('grab-lyrics');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static('static'));

app.get('/api/grabtext', (req, res) => {
  const url = req.query.url;
  grabLyrics(url).then(text => res.json({
    url,
    text,
  }));
});

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT + '...');
});
