'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('../identityModule/plugin.cjs');
var plugin$1 = require('../storageModule/plugin.cjs');
var plugin$2 = require('../rpcModule/plugin.cjs');
var plugin$3 = require('../operationModule/plugin.cjs');
var plugin$4 = require('../programModule/plugin.cjs');
var plugin$5 = require('../utilsModule/plugin.cjs');
var plugin$6 = require('../guestIdentity/plugin.cjs');
var plugin$7 = require('../bundlrStorage/plugin.cjs');
var plugin$8 = require('../systemModule/plugin.cjs');
var plugin$9 = require('../tokenModule/plugin.cjs');
var plugin$a = require('../nftModule/plugin.cjs');
var plugin$b = require('../candyMachineModule/plugin.cjs');
var plugin$c = require('../auctionHouseModule/plugin.cjs');

// Low-level modules.
const corePlugins = () => ({
  install(metaplex) {
    // Low-level modules.
    metaplex.use(plugin.identityModule());
    metaplex.use(plugin$1.storageModule());
    metaplex.use(plugin$2.rpcModule());
    metaplex.use(plugin$3.operationModule());
    metaplex.use(plugin$4.programModule());
    metaplex.use(plugin$5.utilsModule()); // Default drivers.

    metaplex.use(plugin$6.guestIdentity());
    metaplex.use(plugin$7.bundlrStorage()); // Verticals.

    metaplex.use(plugin$8.systemModule());
    metaplex.use(plugin$9.tokenModule());
    metaplex.use(plugin$a.nftModule());
    metaplex.use(plugin$b.candyMachineModule());
    metaplex.use(plugin$c.auctionHouseModule());
  }

});

exports.corePlugins = corePlugins;
//# sourceMappingURL=plugin.cjs.map
