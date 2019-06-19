/*global contract, config, it, assert, embark, web3, before, describe, beforeEach*/
const EthUtil = require('ethereumjs-util');
const TestUtils = require("../utils/testUtils");

// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status = new StatusJS


contract("Channels", function () {

	it("it should connect to ethereum node", async function () {
	  	await status.connect("ws://localhost:8546", "0x7847A6D27AAD97D4C6FDC93F47CCD386F3A9DA8065EAF1A64DB5A284FE6BA76D");
	  	// await status.connect("ws://localhost:8546", privateKey);
	  	await console.log("connected");

	  	// try{
	  	// 	await status.joinChat("#mytest");
	  	// } catch (error){
	  	// 	await console.log(error);
	  	// }
	});

})
;



