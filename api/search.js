const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('config');

const { searchBaseUrl, apiKey } = config.get('server');

router.get('/', (req, res) => {
  try {
    const { query, page } = req.query;   
    const tMDbReqUrl = searchBaseUrl + '?api_key=' + apiKey
      + String(`&query=${query}`)
      + String(`&page=${page}`);
  
    https.get(tMDbReqUrl, tMDbRes => {
      try{
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
                    image: (movie.backdrop_path === null)? '': movie.backdrop_path,
                    poster: (movie.poster_path === null)? '': movie.poster_path,
                    releaseDate: movie.release_date
                  };
                })
              }
            );
      
            res.set('content-type', 'application/json');
            res.send(results);
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