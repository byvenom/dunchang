const { createProxyMiddleware } = require('http-proxy-middleware');
var os = require('os');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `http://${os.hostname()}:5000`,
            changeOrigin: true,
        })
    );
    app.use(
        '/df',
        createProxyMiddleware({
        target: 'https://api.neople.co.kr',
        changeOrigin: true,
        })
    );
   /* app.use(
        '/dart',
        createProxyMiddleware({
        target: 'https://opendart.fss.or.kr',
        changeOrigin: true,
        })
    );*/
   
  
   
  
};