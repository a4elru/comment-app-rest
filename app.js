'use strict';

const express = require('express');
const http = require('http');
const https = require('https');
const app = express();
const params = require('./params');
const routerComments = require('./router/comments');
const envelopeResponse = require('./middleware/envelopeResponse');
const http2https = require('./middleware/http2https');
const fs = require('fs');
const options = {
    key: fs.readFileSync('./cert/privateKey.key'),
    cert: fs.readFileSync('./cert/certificate.crt'),
};

if (params.ADD_HTTP2HTTPS) {
    app.use(http2https());
}
app.use(express.json());
app.use(envelopeResponse());
app.use('/api/comments', routerComments);
app.use(function(request, response, next) {
    response.envelope(404);
});

if (params.ADD_HTTP) {
    http.createServer(app).listen(params.HTTP_PORT);
}
if (params.ADD_HTTPS) {
    https.createServer(options, app).listen(params.HTTPS_PORT);
}