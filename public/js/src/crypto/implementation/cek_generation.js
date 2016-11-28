/*
* @name: cekGeneration()
* @description: generation of the content encryption key,
* @params: 'passphrase' is the user's passphrase or secrete password, call this like you want to...
* CEK means "Content Encryption Key"
* the CEK is encrypted by the passphrase of the user
* @dependencies: crypt_cek.js
*/
var cekGeneration = function(passphrase)
{
	var password = sjcl.random.randomWords(32);
	var password = sjcl.codec.base64.fromBits(password);
	var salt = sjcl.random.randomWords(32);
	var salt = sjcl.codec.base64.fromBits(salt);
	var contentEncryptionKey = sjcl.misc.pbkdf2(password, salt, 4096, 256); //4096 : iteration, 256 : key size
	var contentEncryptionKey = sjcl.codec.base64.fromBits(contentEncryptionKey);
	console.log("CEK generated!");
	return cekEncryption(passphrase, contentEncryptionKey); //cekEncryption() come from js/implementation/crypt_cek.js
}