module.exports = function jsonRes(statusCode, data, options ) {
	var req = this.req;
	var res = this.res;
	var sails = req._sails;

	res.status(statusCode);

	if (req.wantsJSON) {
    res.set('Content-Type', 'application/json')
	    return res.jsonx(data);
	}

	options = (typeof options === 'string') ? { view: options } : options || {};

	if (options.view) {
	    return res.view(options.view, data );
	} else  {
		return res.guessView(data, function couldNotGuessView () {
			return res.jsonx(data);
		});
	}
}
