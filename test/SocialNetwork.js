const { assert } = require('chai');

const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('SocialNetwork', ([deployer,  author, tipper]) => {
  let socialNetwork;

  describe('deployment', () => {
    before(async () => {
      socialNetwork = await SocialNetwork.deployed();
    });

    it('deploys successfully', async () => {
      socialNetwork = await SocialNetwork.deployed();
      const address = await socialNetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      socialNetwork = await SocialNetwork.deployed();
      const name = await socialNetwork.name()
      assert.equal(name, 'Tomas')
    });
  });

  describe('posts', async () => {
    let result, postCount;

    it('create post success', async () => {
      result = await socialNetwork.createPost("This is my first post", {from: author });
      postCount = await socialNetwork.postCount();
      assert.equal(postCount, 1);
      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(event.content, "This is my first post", 'content is correct');
      assert.equal(event.tipAmount, '0', 'tipAmount is correct');
      assert.equal(event.author, author, 'author is correct');
    });
    it('create post fail', async () => {
      await socialNetwork.createPost("", {from: author }).should.be.rejected;
    });

    it('list posts', async () => {
    });
    it('allows users to tip posts', async () => {
    });
  })
})