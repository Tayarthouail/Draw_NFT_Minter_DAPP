/* eslint-disable jest/valid-describe */
const SmartContract = artifacts.require("../contracts/DrawNFT.sol");
const { assert } = require("chai");

require("chai").use(require("chai-as-promised")).should();


contract("SmartContract", (accounts)=> {
  let smartContract;

  
  before(async ()=> {
    smartContract = await SmartContract.deployed();
  });


  // eslint-disable-next-line jest/valid-describe
  describe("Deployment", async () => {
    it("deploys successfully", async ()=> {
        const address = await smartContract.address;
        assert.notEqual(address, "");
        assert.notEqual(address, 0x0);
    });

    it("It has a correct name", async()=> {
      const name = await smartContract.name();
      assert.equal(name, "Smart Contract");
    });
  });

  describe("Mint", async ()=> {
    it("mint successfully", async ()=> {
        const uri = "https://example.com";
        
        await smartContract.mint(accounts[0], uri);
        // if the token is minted we should find the token at URI function
        const uriMint = await smartContract.tokenURI(0);
        assert.equal(uriMint,uri);

        // Check if the balance of the owner has 1 token minted
        const balanceOfOwner = await smartContract.balanceOf(accounts[0]);
        assert.equal(balanceOfOwner, 1);

    });
  });

 
});