var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var secretKey = 'KSqupuYxSNNFLlJUjfHvd7JbT8F4AwD5dmmqCsBExHpMm0XFiaKNn5B5rFaY' +
'X44BCWHIa0vgQ8rpBUknwf82um2J8BRK27eA9CcFlq6UpoLEHESPSbJgHyiBT8P' +
'48azYfVM16itXHxuDUU4Hv6mcLXvSoSjh8cASEA3A';

var EXPIRES_IN_MINUTES = 60 * 24 * 7;
var SECRET = process.env.tokenSecret
	|| secretKey;
var ALGORITHM = "HS256";
var ISSUER = "sutralia.com";
var AUDIENCE = "user.sutralia.com";

var JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer : ISSUER,
	audience: AUDIENCE,
	algorithm: ALGORITHM,
	passReqToCallback: false,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

function _onJwtStrategyAuth(payload, next) {
	var appuser = payload;
	return next(null, appuser, {});
}

passport.use(
  	new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth)
);

module.exports.jwt = {
	expiresInMinutes: EXPIRES_IN_MINUTES,
	secretOrKey: SECRET,
	algorithm : ALGORITHM,
	issuer : ISSUER,
	audience : AUDIENCE,
};