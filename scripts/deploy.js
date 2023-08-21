//Ignore this page
const hre=require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory("NFT");
  const Market = await ethers.getContractFactory("Market");
  // deploy contracts
  const market = await Market.deploy(1);
  const nft = await NFT.deploy();

  console.log("NFT contract address: ", nft.address);
  console.log("Market contract address: ", market.address);
}

main()
  // .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exitCode=1;
  });
