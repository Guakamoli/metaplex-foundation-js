'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var Account = require('../../types/Account.cjs');

const mintAccountParser = {
  name: 'MintAccount',
  deserialize: (data, offset) => {
    const span = splToken.MintLayout.getSpan(data, offset);
    const decoded = splToken.MintLayout.decode(data, offset);
    return [decoded, span];
  }
};
/** @group Accounts */

/** @group Account Helpers */
const parseMintAccount = Account.getAccountParsingFunction(mintAccountParser);
/** @group Account Helpers */

const toMintAccount = Account.getAccountParsingAndAssertingFunction(mintAccountParser);
const tokenAccountParser = {
  name: 'TokenAccount',
  deserialize: (data, offset) => {
    const span = splToken.AccountLayout.getSpan(data, offset);
    const decoded = splToken.AccountLayout.decode(data, offset);
    return [decoded, span];
  }
};
/** @group Accounts */

/** @group Account Helpers */
const parseTokenAccount = Account.getAccountParsingFunction(tokenAccountParser);
/** @group Account Helpers */

const toTokenAccount = Account.getAccountParsingAndAssertingFunction(tokenAccountParser);

exports.parseMintAccount = parseMintAccount;
exports.parseTokenAccount = parseTokenAccount;
exports.toMintAccount = toMintAccount;
exports.toTokenAccount = toTokenAccount;
//# sourceMappingURL=accounts.cjs.map
