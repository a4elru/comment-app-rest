'use strict';

function funcReturner() {
	return function(request, response, next) {
		if ('envelope' in response) {
			throw new Error();
		} else {
			response.envelope = envelope;
		}
		next();
	}
}

function envelope(status, data) {
	this.status(status);
	let json = {};
	if (data !== undefined) {
		json.data = data;
	}
	this.json(json);
}

module.exports = funcReturner;