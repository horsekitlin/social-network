pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address author;
  }

  event PostCreated (
    uint id,
    string content,
    uint tipAmount,
    address author
  );

  constructor() public {
    name = "Tomas";
  }

  function createPost(string memory _content) public {
    require(bytes(_content).length > 0);
    posts[postCount]  = Post(postCount, _content, 0, msg.sender);
    postCount++;
    emit PostCreated(postCount, _content, 0, msg.sender);
  }
}