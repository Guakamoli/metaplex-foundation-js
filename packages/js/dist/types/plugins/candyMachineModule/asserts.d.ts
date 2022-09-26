import { Creator } from '@metaplex-foundation/mpl-token-metadata';
import { CandyMachine } from './models/CandyMachine';
import { ConfigLine } from '@metaplex-foundation/mpl-candy-machine';
import { BigNumber, Signer } from '../../types';
export declare const assertName: (name: string) => void;
export declare const assertSymbol: (symbol: string) => void;
export declare const assertUri: (uri: string) => void;
export declare const assertCreators: (creators: Creator[]) => void;
export declare const assertNotFull: (candyMachine: Pick<CandyMachine, 'itemsAvailable' | 'itemsLoaded'>, index: BigNumber) => void;
export declare const assertNotEmpty: (candyMachine: Pick<CandyMachine, 'itemsRemaining' | 'itemsAvailable'>) => void;
export declare const assertCanAdd: (candyMachine: Pick<CandyMachine, 'itemsAvailable'>, index: BigNumber, amount: number) => void;
export declare const assertAllConfigLineConstraints: (configLines: ConfigLine[]) => void;
export declare const assertCandyMachineIsLive: (candyMachine: Pick<CandyMachine, 'whitelistMintSettings' | 'goLiveDate'>) => void;
export declare const assertCandyMachineHasNotEnded: (candyMachine: Pick<CandyMachine, 'endSettings' | 'itemsMinted'>) => void;
export declare const assertCanMintCandyMachine: (candyMachine: Pick<CandyMachine, 'authorityAddress' | 'itemsRemaining' | 'itemsAvailable' | 'itemsMinted' | 'whitelistMintSettings' | 'goLiveDate' | 'endSettings'>, payer: Signer) => void;
