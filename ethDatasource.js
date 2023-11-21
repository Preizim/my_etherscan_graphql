const { RESTDataSource } = require("apollo-datasource-rest");

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Define constant eth_address with Vitalik's Ethereum address 


//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  constructor() {
    super(); // Call super() to initialize RESTDataSource
    this.baseURL = "https://api.etherscan.io/api"; // Set baseURL for API requests
  }

  async etherBalanceByAddress() {
     // Make GET request to Etherscan API to get ether balance for the address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    // Make GET request to Etherscan API to get total ether supply

    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  //Paste Code Here For New API Endpoints
  async getLatestEthereumPrice() {   // Make GET request to Etherscan API to get latest Ethereum price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }
// Make GET request to Etherscan API to get block confirmation time estimate
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}
// Export EtherDataSource class as a module
module.exports = EtherDataSource;
