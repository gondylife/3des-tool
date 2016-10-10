/**
 * ProcessController
 *
 * @description :: Server-side logic for managing Processes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	encrypt: function(req, res) {
		var returnObject = {};
		var encryptKey = req.body.key; 
		var paramToEncrypt = req.body;
		var paramKeys = req.body.paramKey;
		var paramValues = req.body.paramValue;
		var plen = paramKeys.length;
		var i;
		
		for(i=0; i < plen; i++){
			var pkey = paramKeys[i];
			var pval = paramValues[i];

			returnObject[pkey] = ProcessService.encrypt(req.body.encryption_key, pval);
		}
		res.json(returnObject);
	},
	decrypt: function(req, res) {
		var decrypted_param = ProcessService.decrypt(req.body.key, req.body.param);
		res.json(encrypted_param);
	}
};

