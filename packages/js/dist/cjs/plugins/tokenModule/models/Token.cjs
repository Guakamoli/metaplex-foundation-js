'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var assert = require('../../../utils/assert.cjs');
var Amount = require('../../../types/Amount.cjs');

/** @group Model Helpers */
const isToken = value => typeof value === 'object' && value.model === 'token';
/** @group Model Helpers */

function assertToken(value) {
  assert["default"](isToken(value), `Expected Token model`);
}
/** @group Model Helpers */

const toToken = account => {
  const associatedTokenAddress = pdas.findAssociatedTokenAccountPda(account.data.mint, account.data.owner);
  const isAssociatedToken = associatedTokenAddress.equals(account.publicKey);
  return {
    model: 'token',
    address: isAssociatedToken ? associatedTokenAddress : account.publicKey,
    isAssociatedToken,
    mintAddress: account.data.mint,
    ownerAddress: account.data.owner,
    amount: Amount.token(account.data.amount.toString()),
    closeAuthorityAddress: account.data.closeAuthorityOption ? account.data.closeAuthority : null,
    delegateAddress: account.data.delegateOption ? account.data.delegate : null,
    delegateAmount: Amount.token(account.data.delegatedAmount.toString()),
    state: account.data.state
  };
};
/** @group Models */

/** @group Model Helpers */
const isTokenWithMint = value => typeof value === 'object' && value.model === 'tokenWithMint';
/** @group Model Helpers */

function assertTokenWithMint(value) {
  assert["default"](isTokenWithMint(value), `Expected TokenWithMint model`);
}
/** @group Model Helpers */

const toTokenWithMint = (tokenAccount, mintModel) => {
  const token = toToken(tokenAccount);
  return { ...token,
    model: 'tokenWithMint',
    mint: mintModel,
    amount: Amount.amount(token.amount.basisPoints, mintModel.currency),
    delegateAmount: Amount.amount(token.delegateAmount.basisPoints, mintModel.currency)
  };
};

exports.assertToken = assertToken;
exports.assertTokenWithMint = assertTokenWithMint;
exports.isToken = isToken;
exports.isTokenWithMint = isTokenWithMint;
exports.toToken = toToken;
exports.toTokenWithMint = toTokenWithMint;
//# sourceMappingURL=Token.cjs.map
