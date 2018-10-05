const SHA256 = require("crypto-js/sha256");

class Block{
  constructor(timestamp, data, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block("01/01/2017", "Genesis block", "0");
  }
  getLatestBlocK() {
    return this.chain[this.chain.length-1]
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlocK().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let savjeeCoin = newBlockchain();