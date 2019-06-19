/*global contract, config, it, assert, before, web3*/

const SellerLicense = require('Embark/contracts/SellerLicense');
const ArbitrationLicense = require('Embark/contracts/ArbitrationLicense');

const SNT = require('Embark/contracts/SNT');
const MetadataStore = require('Embark/contracts/MetadataStore');

let accounts;

config({
  contracts: {
    "MiniMeToken": { "deploy": false },
    "MiniMeTokenFactory": {

    },
    "SNT": {
      "instanceOf": "MiniMeToken",
      "args": [
        "$MiniMeTokenFactory",
        "0x0000000000000000000000000000000000000000",
        0,
        "TestMiniMeToken",
        18,
        "STT",
        true
      ]
    },
    License: {
      deploy: false
    },
    SellerLicense: {
      instanceOf: "License",
      args: ["$SNT", 10]
    },
    ArbitrationLicense: {
      instanceOf: "License",
      args: ["$SNT", 10]
    },
    MetadataStore: {
      args: ["$SellerLicense", "$ArbitrationLicense"]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts;
});

let hash, signature;

contract("MetadataStore", function () {
  before(async () => {
    await SNT.methods.generateTokens(accounts[0], 1000).send();
<<<<<<< HEAD

    hash = await MetadataStore.methods.getDataHash("Iuri", License.address, "London").call();
=======
    await SNT.methods.generateTokens(accounts[9], 1000).send();

    const encodedCall = ArbitrationLicense.methods.buy().encodeABI();
    await SNT.methods.approveAndCall(ArbitrationLicense.options.address, 10, encodedCall).send({from: accounts[9]});

    hash = await MetadataStore.methods.getDataHash("Iuri", SellerLicense.address).call();
>>>>>>> 7bb42a74e278dd54f1ae852014b43e0bd3fca371
    signature = await web3.eth.sign(hash, accounts[0]);

  });

  it("should not allow to add new user when not license owner", async function () {
    try {
<<<<<<< HEAD
      await MetadataStore.methods.addOffer(SNT.address, signature, License.address, "London", "USD", "Iuri", [0], 1, accounts[9]).send();
=======
      await MetadataStore.methods.addOffer(SNT.address, signature, SellerLicense.address, "London", "USD", "Iuri", [0], 1, accounts[9]).send();
>>>>>>> 7bb42a74e278dd54f1ae852014b43e0bd3fca371
    } catch(error) {
      const usersSize = await MetadataStore.methods.usersSize().call();
      assert.strictEqual(usersSize, '0');
    }
  });

  it("should allow to add new user and offer when license owner", async function () {
<<<<<<< HEAD
    const encodedCall = License.methods.buy().encodeABI();
    await SNT.methods.approveAndCall(License.options.address, 10, encodedCall).send();
    await MetadataStore.methods.addOffer(SNT.address, signature, License.address, "London", "USD", "Iuri", [0], 1, accounts[9]).send();
=======
    const encodedCall = SellerLicense.methods.buy().encodeABI();
    await SNT.methods.approveAndCall(SellerLicense.options.address, 10, encodedCall).send();
    const receipt = await MetadataStore.methods.addOffer(SNT.address, "0x00", "London", "USD", "Iuri", [0], 1, accounts[9]).send();
>>>>>>> 7bb42a74e278dd54f1ae852014b43e0bd3fca371
    const usersSize = await MetadataStore.methods.usersSize().call();
    assert.strictEqual(usersSize, '1');
    const offersSize = await MetadataStore.methods.offersSize().call();
    assert.strictEqual(offersSize, '1');
  });

  it("should allow to add new offer only when already a user", async function () {
<<<<<<< HEAD
    await MetadataStore.methods.addOffer(SNT.address, signature, License.address, "London", "EUR", "Iuri", [0], 1, accounts[9]).send();
=======
    await MetadataStore.methods.addOffer(SNT.address, "0x00", "London", "EUR", "Iuri", [0], 1, accounts[9]).send();
>>>>>>> 7bb42a74e278dd54f1ae852014b43e0bd3fca371
    const usersSize = await MetadataStore.methods.usersSize().call();
    assert.strictEqual(usersSize, '1');
    const offersSize = await MetadataStore.methods.offersSize().call();
    assert.strictEqual(offersSize, '2');
  });

  it("should not allow to add new offer when margin is more than 100", async function () {
    try {
      await MetadataStore.methods.addOffer(SNT.address, "0x00", "London", "USD", "Iuri", [0], 101, accounts[9]).send();
    } catch(error) {
      const usersSize = await MetadataStore.methods.usersSize().call();
      assert.strictEqual(usersSize, '1');
    }
  });

  it("should allow to update a user and offer", async function () {
    await MetadataStore.methods.updateOffer(0, SNT.address, "0x00", "Paris", "EUR", "Iuri", [0], 1, accounts[9]).send();
    const usersSize = await MetadataStore.methods.usersSize().call();
    assert.strictEqual(usersSize, '1');
    const user = await MetadataStore.methods.users(0).call();
    assert.strictEqual(user.location, 'Paris');

    const offer = await MetadataStore.methods.offers(0).call();
    assert.strictEqual(offer.currency, 'EUR');
  });

  it("should allow to update a user", async function () {
    await MetadataStore.methods.updateUser(SNT.address, "Montreal", "Anthony").send();
    const usersSize = await MetadataStore.methods.usersSize().call();
    assert.strictEqual(usersSize, '1');
    const user = await MetadataStore.methods.users(0).call();
    assert.strictEqual(user.location, 'Montreal');
    assert.strictEqual(user.username, 'Anthony');
  });

  it("should allow to delete an offer", async function () {
<<<<<<< HEAD
    const receipt = await MetadataStore.methods.addOffer(SNT.address, signature, License.address, "London", "EUR", "Iuri", [0], 1, accounts[9]).send();
=======
    const receipt = await MetadataStore.methods.addOffer(SNT.address, "0x00", "London", "EUR", "Iuri", [0], 1, accounts[9]).send();
>>>>>>> 7bb42a74e278dd54f1ae852014b43e0bd3fca371
    const offerAdded = receipt.events.OfferAdded;
    const offerId = offerAdded.returnValues.offerId;

    const receipt2 = await MetadataStore.methods.removeOffer(offerId).send();
    const offerRemoved = receipt2.events.OfferRemoved;
    assert(!!offerRemoved, "OfferRemoved() not triggered");
    assert.equal(offerRemoved.returnValues.owner, accounts[0], "Invalid seller");
    assert.equal(offerRemoved.returnValues.offerId, offerId, "Invalid offer");
  });

});
