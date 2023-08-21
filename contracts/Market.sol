// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Market is ReentrancyGuard {
    address payable owner;
    uint public fee;
    using Counters for Counters.Counter;
    Counters.Counter public itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    event Fee(
        uint fee
    );

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer,
        bool sellerPaymentStatus,
        bool marketPaymentStatus
    );

    mapping(uint => Item) public items;

    constructor(uint _fee) {
        owner = payable(msg.sender);
        require(_fee > 0, "Fee should be greater than zero");
    }

    modifier onlyOwner() {
        require(owner == msg.sender,"Only owner can call this method.");
        _;
    }

    function setFee(uint _fee) external onlyOwner {
        fee = _fee;
        emit Fee(fee);
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price should be greater than zero");

        itemCount.increment();
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        uint count = itemCount.current();
        items[count] = Item(itemCount.current(), _nft, _tokenId, _price, payable(msg.sender), false);

        emit Offered(
            count,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return((items[_itemId].price*(100 + fee))/100);
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];

        require(_itemId > 0 && _itemId <= itemCount.current(), "Item doesn't exist");
        require(msg.value >= _totalPrice, "Not enough ether to cover item price and market fee");
        require(!item.sold, "Item already sold");

        (bool sellerPaymentStatus, ) = item.seller.call{value: item.price}("");
        (bool marketPaymentStatus, ) = owner.call{value: _totalPrice - item.price}("");
        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender,
            sellerPaymentStatus,
            marketPaymentStatus
        );
    }
}
