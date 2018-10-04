class Block{
  constructor(timestamp, data, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}