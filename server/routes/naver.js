const express = require('express');
const router = express.Router();
const config = require("../config/key");
const client_id = config.cilent_id;
const client_secret = config.client_secret;

router.post('/url', (req,res) => {
   
    

    const query = encodeURI(req.body.url);
    var api_url = 'https://openapi.naver.com/v1/util/shorturl';
    var request = require('request');
    var options = {
        url: api_url,
        form: {'url':query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
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

module.exports = router;