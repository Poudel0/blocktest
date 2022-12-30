const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:8545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const wallet = new ethers.Wallet(
    "0xf9c093d5a60ccff3ec5634ad1bb8b129454287ffbb13bb14cd38afaf6284475f",
    provider
  );

  const abi = fs.readFileSync("_first file_sol_SimpleStorage.abi", "utf-8");

  const binary = fs.readFileSync("_first file_sol_SimpleStorage.bin", "utf-8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying the first contract");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
