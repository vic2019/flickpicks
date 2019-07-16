const express = require('express');
const router = express.Router();
const https = require('https');

router.use((req, res, next) => next());

router.get('/', (req, res) => {
  const { sort_by, page, with_genres, year } = req.query;
  // console.log(sort_by, page, with_genres, year);

  const tMDbReqUrl = 'https://api.themoviedb.org/3/discover/movie'
    + '?api_key=<<key>>&language=en-US'
    + '&include_adult=false&include_video=false'
    + String(sort_by? `&sort_by=${sort_by}`: '')
    + String(page? `&page=${page}`: '')
    + String(with_genres? `&with_genres=${with_genres}`: '')
    + String(year? `year=${year}`: '');

  console.log(tMDbReqUrl);

  https.get(tMDbReqUrl, tMDbRes => {
    let data = '';

    tMDbRes.on('data', chunk => {
      data += chunk;
    });
    
    tMDbRes.on('end', () => {
      res.set('content-type', 'application/json');
      res.send(data);
    });
  });
});

module.exports = router;