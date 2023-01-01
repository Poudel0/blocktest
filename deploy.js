require("dotenv").config();
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("_first file_sol_SimpleStorage.abi", "utf-8");

  const binary = fs.readFileSync("_first file_sol_SimpleStorage.bin", "utf-8");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying the first contract");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentFavNum = await contract.get();
  console.log(`Current Fav Number : ${currentFavNum.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
