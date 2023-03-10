'use strict';

const { HTTPS_PORT } = require("../params");

function funcReturner() {
    return function (request, response, next) {
        if (request.secure) {
            next();
        } else {
            let [host] = request.headers.host.split(":");
            host = host + ':' + HTTPS_PORT;
            response.redirect(301, "https://" + host + request.url);
        }
    }
}

module.exports = funcReturner;