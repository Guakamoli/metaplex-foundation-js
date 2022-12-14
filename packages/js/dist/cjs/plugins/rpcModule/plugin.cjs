'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var RpcClient = require('./RpcClient.cjs');

/** @group Plugins */

const rpcModule = () => ({
  install(metaplex) {
    const rpcClient = new RpcClient.RpcClient(metaplex);

    metaplex.rpc = () => rpcClient;
  }

});

exports.rpcModule = rpcModule;
//# sourceMappingURL=plugin.cjs.map
