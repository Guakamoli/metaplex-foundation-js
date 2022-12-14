'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WalletAdapterIdentityDriver = require('./WalletAdapterIdentityDriver.cjs');

const walletAdapterIdentity = walletAdapter => ({
  install(metaplex) {
    metaplex.identity().setDriver(new WalletAdapterIdentityDriver.WalletAdapterIdentityDriver(walletAdapter));
  }

});

exports.walletAdapterIdentity = walletAdapterIdentity;
//# sourceMappingURL=plugin.cjs.map
