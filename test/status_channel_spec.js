/*global contract, config, it, assert, embark, web3, before, describe, beforeEach*/
const EthUtil = require('ethereumjs-util');
const TestUtils = require("../utils/testUtils");

const HDWallet = require('ethereum-hdwallet')
const mnemonic_phrase = "foster gesture flock merge beach plate dish view friend leave drink valley shield list enemy"

let accounts;

config({
  deployment: {
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    accounts: [
      {
        mnemonic: mnemonic_phrase,
        balance: "5ether"
      }
    ]
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts;
});


// basic StatusJS instantiation
const StatusJS = require('status-js-api');
const status = new StatusJS

// generate private key from mnemonic
const hdwallet = HDWallet.fromMnemonic(mnemonic_phrase)
const privateKey = `0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;

contract("Channels", function () {

	// before(async () => {
	//   	await console.log(account);
	// });

	it("it should connect to ethereum node", async function () {
	  	// await status.connect("ws://localhost:8546", "0x7847A6D27AAD97D4C6FDC93F47CCD386F3A9DA8065EAF1A64DB5A284FE6BA76D");
	  	await status.connect("ws://localhost:8546", privateKey);
	  	await console.log("connected");

	  	try{
	  		await status.joinChat("#mytest");
	  	} catch (error){
	  		await console.log(error);
	  	}
	});

})
;



