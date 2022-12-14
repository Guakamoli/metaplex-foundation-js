import assert from '../../../utils/assert.mjs';
import { amount } from '../../../types/Amount.mjs';

/** @group Model Helpers */
const isSft = value => typeof value === 'object' && value.model === 'sft';
/** @group Model Helpers */

function assertSft(value) {
  assert(isSft(value), `Expected Sft model`);
}
/** @group Model Helpers */

const toSft = (metadata, mint) => {
  const {
    address,
    mintAddress,
    ...shared
  } = metadata;
  assert(mintAddress.equals(mint.address), 'The provided mint does not match the mint address in the metadata');
  const currency = { ...mint.currency,
    symbol: metadata.symbol || 'Token'
  };
  return { ...shared,
    model: 'sft',
    address: mintAddress,
    metadataAddress: address,
    mint: { ...mint,
      currency,
      supply: amount(mint.supply.basisPoints, currency)
    }
  };
};
/** @group Models */

/** @group Model Helpers */
const isSftWithToken = value => isSft(value) && 'token' in value;
/** @group Model Helpers */

function assertSftWithToken(value) {
  assert(isSftWithToken(value), `Expected Sft model with token`);
}
/** @group Model Helpers */

const toSftWithToken = (metadata, mint, token) => {
  const sft = toSft(metadata, mint);
  const currency = sft.mint.currency;
  return { ...sft,
    token: { ...token,
      amount: amount(token.amount.basisPoints, currency),
      delegateAmount: amount(token.delegateAmount.basisPoints, currency)
    }
  };
};

export { assertSft, assertSftWithToken, isSft, isSftWithToken, toSft, toSftWithToken };
//# sourceMappingURL=Sft.mjs.map
