const express = require('express');
const router = express.Router();
const https = require('https');
const URL = require('url');
const path = require('path');
const config = require('config');

const { movieBaseUrl, apiKey } = config.get('server');

router.get(/\d+/, (req, res) => {
  const url = new URL.parse(req.url);
  const movieId = path.basename(url.pathname);

  const tMDbReqUrl = movieBaseUrl + `/${movieId}?api_key=${apiKey}`
    + `&append_to_response=videos,credits`;

  https.get(tMDbReqUrl, tMDbRes => {
    let buffer = '';

    tMDbRes.on('data', chunk => {
      buffer += chunk;
    });
    
    tMDbRes.on('end', () => {
      const data = JSON.parse(buffer);

      const results = Object.assign({}, 
        { backdrop_path: data.backdrop_path },
        { id: data.id},
        { overview: data.overview },
        { poster_path: data.poster_path },
        {release_date: data.release_date },
        { title: data.title },
        { videos: data.videos.results },
        { cast: data.credits.cast.slice(0, 8).map(member => {
            return {
              character: member.character,
              name: member.name
            }
          }) 
        },
        { crew: data.credits.crew.slice(0, 4).map(member => {
            return {
              job: member.job,
              name: member.name
            }
          }) 
        }
      );

      res.set('content-type', 'application/json');
      res.send(results);
    });
  });
});

module.exports = router;