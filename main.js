const SHA256 = require("crypto-js/sha256");

class Block{
  constructor(timestamp, data, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();Block
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
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
    if (currentBlock.hash !== currentBlock.calculateHash()) {
      return false;
    }
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
    if(this.chain[0] !== this.createGenesisBlock()) {
      return false;
    }
    return true;
    }
  }
}

let savjeeCoin = new Blockchain();

savjeeCoin.addBlock(new Block("20/07/2017", { amount: 4 }));
savjeeCoin.addBlock(new Block("22/07/2017", { amount: 14 }));
savjeeCoin.chain[1].data = { amount: 100 };
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash()


console.log(JSON.stringify(savjeeCoin, null, 4));

console.log('Blockchain valid? ' + savjeeCoin.isChainValid());