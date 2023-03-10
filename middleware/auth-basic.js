'use strict';

function funcReturner() {
    return function (request, response, next) {
        response.setHeader('WWW-Authenticate','Basic realm="My Realm"');
        if (clientIsAuthenticated(request)) {
            next();
        } else {
            response.envelope(401);
        }
    }
}

function clientIsAuthenticated(request) {
    let authorization = request.get('authorization');
    if (authorization === undefined) return false;

    let [authenticationScheme, base64credentials] = authorization.split(' ');
    if (authenticationScheme != "Basic") return false;

    let credentials = Buffer.from(base64credentials, 'base64').toString('utf8');
    let [login, password] = credentials.split(":");
    if (login != 'admin' || password != 'admin') return false;

    return true;
}

module.exports = funcReturner;