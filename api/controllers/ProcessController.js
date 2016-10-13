/**
 * ProcessController
 *
 * @description :: Server-side logic for managing Processes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	encrypt: function(req, res) {
		var returnObject = {};

		var is_raw = req.body.is_raw;

		if (!is_raw) {

			var paramToEncrypt = req.body;
			var paramKeys = req.body.paramKey;
			var paramValues = req.body.paramValue;
			var plen = paramKeys.length;
			var i;

			for (i=0; i < plen; i++) {
				var pkey = paramKeys[i];
				var pval = paramValues[i];

				returnObject[pkey] = ProcessService.encrypt(req.body.encryption_key, pval);
			}

		} else {

			var jsonParams = req.body.jsonparam;
			var key = req.body.encryption_key;
			for (var param in jsonParams) {
				if (jsonParams.hasOwnProperty(param)) {
					var value = jsonParams[param];
					returnObject[param] = ProcessService.encrypt(key, value);
				}
			}

		}

		res.json(returnObject);
	},
	decrypt: function(req, res) {

		var returnObject = {};

		var is_raw = req.body.is_raw;

		if (!is_raw) {

			var decryptKey = req.body.key; 
			var paramToDecrypt = req.body;
			var paramKeys = req.body.paramKey;
			var paramValues = req.body.paramValue;
			var plen = paramKeys.length;
			var i;
			
			for (i=0; i < plen; i++) {
				var pkey = paramKeys[i];
				var pval = paramValues[i];

				returnObject[pkey] = ProcessService.decrypt(req.body.decryption_key, pval);
			}
		} else {

			var jsonParams = req.body.jsonparam;
			var key = req.body.encryption_key;
			for (var param in jsonParams) {
				if (jsonParams.hasOwnProperty(param)) {
					var value = jsonParams[param];
					returnObject[param] = ProcessService.decrypt(key, value);
				}
			}
		}

		res.json(returnObject);
	}

};

