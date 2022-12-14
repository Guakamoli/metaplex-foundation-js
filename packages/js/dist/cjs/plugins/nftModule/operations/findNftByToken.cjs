'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Operation = require('../../../types/Operation.cjs');
var accounts = require('../../tokenModule/accounts.cjs');

// -----------------
// Operation
// -----------------
const Key = 'FindNftByTokenOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftByTokenOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftByTokenOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const token = accounts.toTokenAccount(await metaplex.rpc().getAccount(operation.input.token));
    scope.throwIfCanceled();
    const asset = await metaplex.nfts().findByMint({ ...operation.input,
      mintAddress: token.data.mint,
      tokenAddress: operation.input.token
    }).run(scope);
    return asset;
  }
};

exports.findNftByTokenOperation = findNftByTokenOperation;
exports.findNftByTokenOperationHandler = findNftByTokenOperationHandler;
//# sourceMappingURL=findNftByToken.cjs.map
