/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getProfile: function(req,res){
		req.promise
		.then(sails.models.user.getMyProfile)
		.then(res.apiOK)
		.error(res.apiWarning)
		.catch(res.serverError);
	}
};

