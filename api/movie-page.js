const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('config');
const axios = require('axios');

const { movieBaseUrl, apiKey } = config.get('server');

router.get("/", (req, res) => {
  try {
    const tMDbReqUrl = movieBaseUrl + `/${req.query.id}?api_key=${apiKey}`
      + `&append_to_response=videos,credits,recommendations`;

    axios.get(tMDbReqUrl)
      .then(tMDbRes => {
        const data = tMDbRes.data;
        if (!data) {
          res.status(404).end();
          return;
        }

        const results = Object.assign({},
          { notFound: false },
          { backdrop: data.backdrop_path? data.backdrop_path: '' },
          { id: String(data.id)},
          { overview: data.overview },
          { poster: data.poster_path? data.poster_path: '' },
          { releaseDate: data.release_date },
          { title: data.title },
          { videos: data.videos.results.map(video => {
              return { key: video.key? video.key: '' }
            })  
          },
          { cast: data.credits.cast.slice(0, 10).map(member => {
              return {
                character: member.character,
                name: member.name,
                image: member.profile_path
              }
            }) 
          },
          { crew: data.credits.crew.slice(0, 4).map(member => {
              return {
                job: member.job,
                name: member.name
              }
            }) 
          },
          { recommendations: data.recommendations.results.slice(0, 8)
              .map(movie => {
                return {
                  id: String(movie.id),
                  title: movie.title,
                  image: movie.backdrop_path
                }
              }) 
          }
        );

        res.set('content-type', 'application/json');
        res.send(results);
      })
      .catch(err => {
        res.status(404).end();
      });

    // https.get(tMDbReqUrl, tMDbRes => {
    //   try {
    //     if (tMDbRes.statusCode === 404) {
    //       res.status(404).end();
    //       return;
    //     };

    //     if(tMDbRes.statusCode !== 200) throw Error();

    //     let buffer = '';

    //     tMDbRes.on('data', chunk => {
    //       buffer += chunk;
    //     });
        
    //     tMDbRes.on('end', () => {
    //       try {
    //         const data = JSON.parse(buffer);

    //         const results = Object.assign({},
    //           { notFound: false },
    //           { backdrop: data.backdrop_path? data.backdrop_path: '' },
    //           { id: String(data.id)},
    //           { overview: data.overview },
    //           { poster: data.poster_path? data.poster_path: '' },
    //           { releaseDate: data.release_date },
    //           { title: data.title },
    //           { videos: data.videos.results.map(video => {
    //               return { key: video.key? video.key: '' }
    //             })  
    //           },
    //           { cast: data.credits.cast.slice(0, 10).map(member => {
    //               return {
    //                 character: member.character,
    //                 name: member.name,
    //                 image: member.profile_path
    //               }
    //             }) 
    //           },
    //           { crew: data.credits.crew.slice(0, 4).map(member => {
    //               return {
    //                 job: member.job,
    //                 name: member.name
    //               }
    //             }) 
    //           },
    //           { recommendations: data.recommendations.results.slice(0, 8)
    //               .map(movie => {
    //                 return {
    //                   id: String(movie.id),
    //                   title: movie.title,
    //                   image: movie.backdrop_path
    //                 }
    //               }) 
    //           }
    //         );

    //         res.set('content-type', 'application/json');
    //         res.send(results);
    //       } catch(err) {
    //         res.status(500).end();
    //         console.log(err.message);
    //       }
    //     });
    //   } catch(err) {
    //     res.status(500).end();
    //     console.log(err.message);
    //   }
    // });
  } catch(err) {
    res.status(500).end();
    console.log(err.message);
  }
});

module.exports = router;