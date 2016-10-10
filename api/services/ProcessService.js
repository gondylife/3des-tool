var forge = require('node-forge');
var CryptoJS = require('crypto-js');
var utf8 = require('utf8');

module.exports = {
	hexToString: function(hex) {
		var hex = hex.toString();
		var str = '';

		for (var n = 0; n < hex.length; n += 2) {
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16)); 
		}
		return str;
	},
	encrypt: function(key, plain_text) {
		key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
		key = key + key.substring(0, 8);

		var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
		cipher.start({iv: ''});
		cipher.update(forge.util.createBuffer(plain_text, 'utf-8'));
		cipher.finish();

		var encrypted = cipher.output;

		return (forge.util.encode64(encrypted.getBytes())); 
	},
	decrypt: function(key, encrypted_text) {
		key = CryptoJS.MD5(utf8.encode(key)).toString(CryptoJS.enc.Latin1);
		key = key + key.substring(0, 8);

		var decipher = forge.cipher.createDecipher('3DES-ECB', forge.util.createBuffer(key));
		encrypted_text = forge.util.decode64(encrypted_text);
		decipher.start({iv:''});
		decipher.update(forge.util.createBuffer(encrypted_text, 'utf-8'));
		decipher.finish();

		var decrypted = decipher.output; 

		return this.hexToString(decrypted.toHex());
	}
};