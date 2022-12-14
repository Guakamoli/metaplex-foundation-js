'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var assert = require('../../../utils/assert.cjs');
var common = require('../../../utils/common.cjs');
var BigNumber = require('../../../types/BigNumber.cjs');

/** @group Model Helpers */
const isMetadata = value => typeof value === 'object' && value.model === 'metadata';
/** @group Model Helpers */

function assertMetadata(value) {
  assert["default"](isMetadata(value), `Expected Metadata model`);
}
/** @group Model Helpers */

const toMetadata = (account, json) => {
  var _account$data$data$cr;

  return {
    model: 'metadata',
    address: pdas.findMetadataPda(account.data.mint),
    mintAddress: account.data.mint,
    updateAuthorityAddress: account.data.updateAuthority,
    json: json !== null && json !== void 0 ? json : null,
    jsonLoaded: json !== undefined,
    name: common.removeEmptyChars(account.data.data.name),
    symbol: common.removeEmptyChars(account.data.data.symbol),
    uri: common.removeEmptyChars(account.data.data.uri),
    isMutable: account.data.isMutable,
    primarySaleHappened: account.data.primarySaleHappened,
    sellerFeeBasisPoints: account.data.data.sellerFeeBasisPoints,
    editionNonce: account.data.editionNonce,
    creators: (_account$data$data$cr = account.data.data.creators) !== null && _account$data$data$cr !== void 0 ? _account$data$data$cr : [],
    tokenStandard: account.data.tokenStandard,
    collection: account.data.collection ? { ...account.data.collection,
      address: account.data.collection.key
    } : null,
    collectionDetails: account.data.collectionDetails ? {
      version: account.data.collectionDetails.__kind,
      size: BigNumber.toBigNumber(account.data.collectionDetails.size)
    } : null,
    uses: account.data.uses ? { ...account.data.uses,
      remaining: BigNumber.toBigNumber(account.data.uses.remaining),
      total: BigNumber.toBigNumber(account.data.uses.total)
    } : null
  };
};

exports.assertMetadata = assertMetadata;
exports.isMetadata = isMetadata;
exports.toMetadata = toMetadata;
//# sourceMappingURL=Metadata.cjs.map
