const express = require('express');
const router = express.Router();
const https = require('https');
const URL = require('url');
const path = require('path');
const config = require('config');

const { movieBaseUrl, apiKey } = config.get('server');

router.get(/\d+/, (req, res) => {
  const url = new URL.parse(req.url);
  const id = path.basename(url.pathname);
  console.log(id);

  const tMDbReqUrl = movieBaseUrl + `/${id}?api_key=${apiKey}`
    + `&append_to_response=videos,credits`;

  https.get(tMDbReqUrl, tMDbRes => {
    let buffer = '';

    tMDbRes.on('data', chunk => {
      buffer += chunk;
    });
    
    tMDbRes.on('end', () => {
      const data = JSON.parse(buffer);

      // const results = Object.assign({}, 
      //   { page: data.page },
      //   { total_pages: data.total_pages},
      //   { movies: data.results.map(movie => {
      //       return {
      //         id: movie.id,
      //         title: movie.title,
      //         backdrop_path: movie.backdrop_path,
      //         release_date: movie.release_date
      //       };
      //     })
      //   }
      // );

      res.set('content-type', 'application/json');
      res.send(data);
    });
  });
});

module.exports = router;