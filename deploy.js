const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:8545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0xbbfbbf489c8129360047543e19e1f22a9e10368cca5ab832c45213daad33f328",
    provider
  );

  const abi = fs.readFileSync("_first file_sol_SimpleStorage.abi", "utf-8");

  const binary = fs.readFileSync("_first file_sol_SimpleStorage.bin", "utf-8");

  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Deploying the first contract");
  // const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1);
  // console.log(contract);

  console.log("Deploying only transaction data");
  const nonce = await wallet.getTransactionCount();
  const tx = {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806360fe47b11461003b5780636d4ce63c14610057575b600080fd5b6100556004803603810190610050919061009d565b610075565b005b61005f61007f565b60405161006c91906100d9565b60405180910390f35b8060008190555050565b60008054905090565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220e5f72f4c7ecbddf98cefbaef6d2dd893d51f699f264ee8b1712bb7b5440a2b3464736f6c63430008070033",
    chainId: 1337,
  };

  const sentTxResponse = await wallet.sendTransaction(tx);
  await sentTxResponse.wait(1);
  console.log(sentTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
