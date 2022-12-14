'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../../utils/assert.cjs');
var Amount = require('../../../types/Amount.cjs');

/** @group Model Helpers */
const isSft = value => typeof value === 'object' && value.model === 'sft';
/** @group Model Helpers */

function assertSft(value) {
  assert["default"](isSft(value), `Expected Sft model`);
}
/** @group Model Helpers */

const toSft = (metadata, mint) => {
  const {
    address,
    mintAddress,
    ...shared
  } = metadata;
  assert["default"](mintAddress.equals(mint.address), 'The provided mint does not match the mint address in the metadata');
  const currency = { ...mint.currency,
    symbol: metadata.symbol || 'Token'
  };
  return { ...shared,
    model: 'sft',
    address: mintAddress,
    metadataAddress: address,
    mint: { ...mint,
      currency,
      supply: Amount.amount(mint.supply.basisPoints, currency)
    }
  };
};
/** @group Models */

/** @group Model Helpers */
const isSftWithToken = value => isSft(value) && 'token' in value;
/** @group Model Helpers */

function assertSftWithToken(value) {
  assert["default"](isSftWithToken(value), `Expected Sft model with token`);
}
/** @group Model Helpers */

const toSftWithToken = (metadata, mint, token) => {
  const sft = toSft(metadata, mint);
  const currency = sft.mint.currency;
  return { ...sft,
    token: { ...token,
      amount: Amount.amount(token.amount.basisPoints, currency),
      delegateAmount: Amount.amount(token.delegateAmount.basisPoints, currency)
    }
  };
};

exports.assertSft = assertSft;
exports.assertSftWithToken = assertSftWithToken;
exports.isSft = isSft;
exports.isSftWithToken = isSftWithToken;
exports.toSft = toSft;
exports.toSftWithToken = toSftWithToken;
//# sourceMappingURL=Sft.cjs.map
