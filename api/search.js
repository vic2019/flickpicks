const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('config');

const { searchBaseUrl, apiKey } = config.get('server');

router.get('/', (req, res) => {
  const { query, page } = req.query;

  if (!query) res.status(400).end();

  const tMDbReqUrl = searchBaseUrl + '?api_key=' + apiKey
    + String(`&query=${query}`)
    + String(`&page=${page}`);

  console.log(tMDbReqUrl);

  https.get(tMDbReqUrl, tMDbRes => {
    let buffer = '';

    tMDbRes.on('data', chunk => {
      buffer += chunk;
    });
    
    tMDbRes.on('end', () => {
      const data = JSON.parse(buffer);
      if (!data.results) {
        res.status(404).end();
        return;
      }

      const results = Object.assign({}, 
        { page: data.page },
        { totalPages: data.total_pages},
        { movies: data.results.map(movie => {
            return {
              id: movie.id,
              title: movie.title,
              image: (movie.backdrop_path === null)? '': movie.backdrop_path,
              poster: (movie.poster_path === null)? '': movie.poster_path,
              releaseDate: movie.release_date
            };
          })
        }
      );

      res.set('content-type', 'application/json');
      res.send(results);
    });
  });
});

module.exports = router;