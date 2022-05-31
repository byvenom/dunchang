const express = require('express');
const router = express.Router();
const config = require("../config/key");
const client_id_url = config.cilent_id_url;
const client_secret_url = config.client_secret_url;
const client_id_search = config.client_id_search;
const client_secret_search = config.client_secret_search;
router.post('/url', (req,res) => {
   
    

    const query = encodeURI(req.body.url);
    var api_url = 'https://openapi.naver.com/v1/util/shorturl';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'url':query},
        headers: {'X-Naver-Client-Id':client_id_url, 'X-Naver-Client-Secret': client_secret_url}
     };
    request.post(options, function (error, response, body) {
   
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        //res.status(response.statusCode).end();
        res.end();
        console.log('error = ' + response.statusCode);
      }
    });
    

});

router.post('/newssearch', (req,res) => {
   
    
 
  const query = encodeURI(req.body.text);
  const start = req.body.start;
  var api_url = `https://openapi.naver.com/v1/search/news?query=${query}&start=${start}`;
  var request = require('request');
  var options = {
      url: api_url,
      headers: {'X-Naver-Client-Id':client_id_search, 'X-Naver-Client-Secret': client_secret_search}
   };
  request.get(options, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
      
    } else {
      res.status(response.statusCode).end();
      res.end();
      console.log('error = ' + response.statusCode);
    }
  });
  

});

module.exports = router;