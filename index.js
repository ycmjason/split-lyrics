const express = require('express');
const morgan = require('morgan');
const grabLyrics = require('grab-lyrics');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.static('static'));

const EMPTY_LYRICS = {
  title: '',
  artist: '',
  lyrics: '',
};

app.get('/api/grab', (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(EMPTY_LYRICS);

  grabLyrics(url).then(({ title, artist, lyrics }) => res.json({
    title,
    artist,
    lyrics,
  })).catch(e => console.log(e));
});

app.listen(PORT, () => console.log('Listening on port ' + PORT + '...'));
