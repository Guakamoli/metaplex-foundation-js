import { defineProperty as _defineProperty } from '../_virtual/_rollupPluginBabelHelpers.mjs';
import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import base58 from 'bs58';
import BN from 'bn.js';
import { GmaBuilder } from './GmaBuilder.mjs';

class GpaBuilder {
  /** The connection instance to use when fetching accounts. */

  /** The public key of the program we want to retrieve accounts from. */

  /** The configs to use when fetching program accounts. */
  constructor(metaplex, programId) {
    _defineProperty(this, "config", {});

    this.metaplex = metaplex;
    this.programId = programId;
  }

  mergeConfig(config) {
    this.config = { ...this.config,
      ...config
    };
    return this;
  }

  slice(offset, length) {
    this.config.dataSlice = {
      offset,
      length
    };
    return this;
  }

  withoutData() {
    return this.slice(0, 0);
  }

  addFilter(...filters) {
    if (!this.config.filters) {
      this.config.filters = [];
    }

    this.config.filters.push(...filters);
    return this;
  }

  where(offset, bytes) {
    if (Buffer.isBuffer(bytes)) {
      bytes = base58.encode(bytes);
    } else if (typeof bytes === 'object' && 'toBase58' in bytes) {
      bytes = bytes.toBase58();
    } else if (BN.isBN(bytes)) {
      bytes = base58.encode(bytes.toArray());
    } else if (typeof bytes !== 'string') {
      bytes = base58.encode(new BN(bytes, 'le').toArray());
    }

    return this.addFilter({
      memcmp: {
        offset,
        bytes
      }
    });
  }

  whereSize(dataSize) {
    return this.addFilter({
      dataSize
    });
  }

  sortUsing(callback) {
    this.sortCallback = callback;
    return this;
  }

  async get() {
    const accounts = await this.metaplex.rpc().getProgramAccounts(this.programId, this.config);

    if (this.sortCallback) {
      accounts.sort(this.sortCallback);
    }

    return accounts;
  }

  async getAndMap(callback) {
    return (await this.get()).map(callback);
  }

  async getPublicKeys() {
    return this.getAndMap(account => account.publicKey);
  }

  async getDataAsPublicKeys() {
    return this.getAndMap(account => new PublicKey(account.data));
  }

  async getMultipleAccounts(callback, options) {
    const cb = callback !== null && callback !== void 0 ? callback : account => new PublicKey(account.data);
    return new GmaBuilder(this.metaplex, await this.getAndMap(cb), options);
  }

}

export { GpaBuilder };
//# sourceMappingURL=GpaBuilder.mjs.map
