import { WRAPPED_SOL_MINT } from '../constants.mjs';
import assert from '../../../utils/assert.mjs';
import { amount } from '../../../types/Amount.mjs';

/** @group Models */

/** @group Model Helpers */
const isMint = value => typeof value === 'object' && value.model === 'mint';
/** @group Model Helpers */

function assertMint(value) {
  assert(isMint(value), `Expected Mint model`);
}
/** @group Model Helpers */

const toMint = account => {
  const isWrappedSol = account.publicKey.equals(WRAPPED_SOL_MINT);
  const currency = {
    symbol: isWrappedSol ? 'SOL' : 'Token',
    decimals: account.data.decimals,
    namespace: 'spl-token'
  };
  return {
    model: 'mint',
    address: account.publicKey,
    mintAuthorityAddress: account.data.mintAuthorityOption ? account.data.mintAuthority : null,
    freezeAuthorityAddress: account.data.freezeAuthorityOption ? account.data.freezeAuthority : null,
    decimals: account.data.decimals,
    supply: amount(account.data.supply.toString(), currency),
    isWrappedSol,
    currency
  };
};

export { assertMint, isMint, toMint };
//# sourceMappingURL=Mint.mjs.map
