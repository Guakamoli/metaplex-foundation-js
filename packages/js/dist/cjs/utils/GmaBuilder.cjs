'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('./common.cjs');

class GmaBuilder {
  constructor(metaplex, publicKeys, options = {}) {
    var _options$chunkSize;

    this.metaplex = metaplex;
    this.chunkSize = (_options$chunkSize = options.chunkSize) !== null && _options$chunkSize !== void 0 ? _options$chunkSize : 100;
    this.commitment = options.commitment;
    this.publicKeys = publicKeys;
  }

  static make(metaplex, publicKeys, options = {}) {
    return new GmaBuilder(metaplex, publicKeys, options);
  }

  chunkBy(n) {
    this.chunkSize = n;
    return this;
  }

  addPublicKeys(publicKeys) {
    this.publicKeys.push(...publicKeys);
    return this;
  }

  getPublicKeys() {
    return this.publicKeys;
  }

  getUniquePublicKeys() {
    // TODO: Only send unique keys and reconciliate after call.
    return this.getPublicKeys();
  }

  async getFirst(n) {
    const end = this.boundNumber(n !== null && n !== void 0 ? n : 1);
    return this.getChunks(this.getPublicKeys().slice(0, end));
  }

  async getLast(n) {
    const start = this.boundNumber(n !== null && n !== void 0 ? n : 1);
    return this.getChunks(this.getPublicKeys().slice(-start));
  }

  async getBetween(start, end) {
    start = this.boundNumber(start);
    end = this.boundNumber(end);
    [start, end] = start > end ? [end, start] : [start, end];
    return this.getChunks(this.getPublicKeys().slice(start, end));
  }

  async getPage(page, perPage) {
    return this.getBetween((page - 1) * perPage, page * perPage);
  }

  async get() {
    return this.getChunks(this.getPublicKeys());
  }

  async getAndMap(callback) {
    return (await this.get()).map(callback);
  }

  async getChunks(publicKeys) {
    const chunks = common.chunk(publicKeys, this.chunkSize);
    const chunkPromises = chunks.map(chunk => this.getChunk(chunk));
    const resolvedChunks = await Promise.all(chunkPromises);
    return resolvedChunks.flat();
  }

  async getChunk(publicKeys) {
    try {
      // TODO(loris): Use lower level RPC call to add dataSlice support.
      return await this.metaplex.rpc().getMultipleAccounts(publicKeys, this.commitment);
    } catch (error) {
      // TODO(loris): Custom error instead.
      throw error;
    }
  }

  boundNumber(n) {
    return this.boundIndex(n - 1) + 1;
  }

  boundIndex(index) {
    index = index < 0 ? 0 : index;
    index = index >= this.publicKeys.length ? this.publicKeys.length - 1 : index;
    return index;
  }

}

exports.GmaBuilder = GmaBuilder;
//# sourceMappingURL=GmaBuilder.cjs.map
