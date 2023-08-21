const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/TKRwy99WTU4AzULk8QfXxBD9AO1vr2af'); // from alchemy

// ABI and contract address of my deployed contract
const contractAddress = contract.address;
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nft",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "sellerPaymentStatus",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "marketPaymentStatus",
        "type": "bool"
      }
    ],
    "name": "Bought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "Fee",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nft",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      }
    ],
    "name": "Offered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "fee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "getTotalPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "itemCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "items",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC721",
        "name": "nft",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "sold",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC721",
        "name": "_nft",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "makeItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "purchaseItem",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] // from artifacts,market.json

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// setFee
async function setFee() {
  // my owner account's private key
  const privateKey = 'a5d1b85e485935dbad03eee08b30e10aa6d96b62cecbe9681e14fc74b70e336c';//my account 3
  const wallet = new ethers.Wallet(privateKey, provider);

  // Put whatever you want
  const fee = 0.2;

  const contractWithSigner = contract.connect(wallet);
  const transaction = await contractWithSigner.setFee(fee);
  await transaction.wait();

  console.log('Fee set successfully');
}

// makeItem
async function makeItem() {
  // private key of seller's account
  const sellerPrivateKey = '71758027894f70061b63c6560af3e35ce3e06b3ba6afe984a05b8e8b866f652f';//my account 2
  const sellerWallet = new ethers.Wallet(sellerPrivateKey, provider);

  // address of the ERC721 token and other values
  const nftAddress = '0xef2d493dcf55547a800da4da1ca7924d7b20581e';//from my etherscan, to address
  const tokenId = 1;
  const price = ethers.utils.parseEther('0.1'); // 0.1 ETH

  const contractWithSigner = contract.connect(sellerWallet);
  const transaction = await contractWithSigner.makeItem(nftAddress, tokenId, price);
  await transaction.wait();

  console.log('Item created successfully');
}

// purchaseItem
async function purchaseItem(itemId) {
  // buyer's private key
  const buyerPrivateKey = '71758027894f70061b63c6560af3e35ce3e06b3ba6afe984a05b8e8b866f652f';
  const buyerWallet = new ethers.Wallet(buyerPrivateKey, provider);

  const contractWithSigner = contract.connect(buyerWallet);
  const transaction = await contractWithSigner.purchaseItem(itemId, { value: ethers.utils.parseEther('0.15') }); // Amount including fee
  await transaction.wait();

  console.log('Item purchased successfully');
}


setFee();
makeItem();
purchaseItem(1); // Put the itemId you want to purchase
