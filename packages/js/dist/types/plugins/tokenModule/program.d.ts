import { MintGpaBuilder, TokenGpaBuilder } from './gpaBuilders';
import { Metaplex } from '../../Metaplex';
/** @group Programs */
export declare const TokenProgram: {
    publicKey: import("@solana/web3.js").PublicKey;
    mintAccounts(metaplex: Metaplex): MintGpaBuilder;
    tokenAccounts(metaplex: Metaplex): TokenGpaBuilder;
};
