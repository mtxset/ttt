module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
      testnet: {
      host: "192.168.0.104",
      port: 8545,
      network_id: "*",
      gas: 3000000
    }
  }
};
