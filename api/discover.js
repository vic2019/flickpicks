const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('config');

const { discoverBaseUrl, apiKey } = config.get('server');

router.get('/', (req, res) => {
  try {
    const { sort_by, page, with_genres, year } = req.query;
    
    const tMDbReqUrl = discoverBaseUrl + '?api_key=' + apiKey
    + String(sort_by? `&sort_by=${sort_by}`: '')
    + String(page? `&page=${page}`: '')
    + String(with_genres? `&with_genres=${with_genres}`: '')
    + String(year? `&primary_release_year=${year}`: '');
    
    https.get(tMDbReqUrl, tMDbRes => {
      try {
        let buffer = '';
        tMDbRes.on('data', chunk => {
          buffer += chunk;
        });
        
        tMDbRes.on('end', () => {
          try {
            const data = JSON.parse(buffer);
      
            const results = Object.assign({}, 
              { page: data.page },
              { totalPages: data.total_pages},
              { movies: data.results.map(movie => {
                  return {
                    id: String(movie.id),
                    title: movie.title,
                    image: (movie.backdrop_path === null)? '':
                      movie.backdrop_path,
                    poster: (movie.poster_path === null)? '': movie.poster_path,
                    releaseDate: movie.release_date
                  };
                })
              }
            );
      
            res.json(results);
          } catch(err) {
            res.status(500).end();
            console.log(err.message);
          }
        });
      } catch(err) {
        res.status(500).end();
        console.log(err.message);
      }
    });
  } catch(err) {
    res.status(500).end();
    console.log(err.message);
  }
});

module.exports = router;