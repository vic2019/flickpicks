const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('config');

const { discoverBaseUrl, apiKey } = config.get('server');

router.get('/', (req, res) => {
  const { sort_by, page, with_genres, year } = req.query;

  const tMDbReqUrl = discoverBaseUrl + '?api_key=' + apiKey
    + String(sort_by? `&sort_by=${sort_by}`: '')
    + String(page? `&page=${page}`: '')
    + String(with_genres? `&with_genres=${with_genres}`: '')
    + String(year? `&year=${year}`: '');

  https.get(tMDbReqUrl, tMDbRes => {
    let buffer = '';

    tMDbRes.on('data', chunk => {
      buffer += chunk;
    });
    
    tMDbRes.on('end', () => {
      const data = JSON.parse(buffer);
      const results = Object.assign({}, 
        { page: data.page },
        { totalPages: data.total_pages},
        { movies: data.results.map(movie => {
            return {
              id: movie.id,
              title: movie.title,
              image: (movie.backdrop_path === null)? '': movie.backdrop_path,
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