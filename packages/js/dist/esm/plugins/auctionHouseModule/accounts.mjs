import { Auctioneer, AuctionHouse, ListingReceipt, BidReceipt, PurchaseReceipt } from '@metaplex-foundation/mpl-auction-house';
import { getAccountParsingFunction, getAccountParsingAndAssertingFunction } from '../../types/Account.mjs';

/** @group Accounts */

/** @group Account Helpers */
const parseAuctioneerAccount = getAccountParsingFunction(Auctioneer);
/** @group Account Helpers */

const toAuctioneerAccount = getAccountParsingAndAssertingFunction(Auctioneer);
/** @group Accounts */

/** @group Account Helpers */
const parseAuctionHouseAccount = getAccountParsingFunction(AuctionHouse);
/** @group Account Helpers */

const toAuctionHouseAccount = getAccountParsingAndAssertingFunction(AuctionHouse);
/** @group Accounts */

/** @group Account Helpers */
const parseListingReceiptAccount = getAccountParsingFunction(ListingReceipt);
/** @group Account Helpers */

const toListingReceiptAccount = getAccountParsingAndAssertingFunction(ListingReceipt);
/** @group Accounts */

/** @group Account Helpers */
const parseBidReceiptAccount = getAccountParsingFunction(BidReceipt);
/** @group Account Helpers */

const toBidReceiptAccount = getAccountParsingAndAssertingFunction(BidReceipt);
/** @group Accounts */

/** @group Account Helpers */
const parsePurchaseReceiptAccount = getAccountParsingFunction(PurchaseReceipt);
/** @group Account Helpers */

const toPurchaseReceiptAccount = getAccountParsingAndAssertingFunction(PurchaseReceipt);

export { parseAuctionHouseAccount, parseAuctioneerAccount, parseBidReceiptAccount, parseListingReceiptAccount, parsePurchaseReceiptAccount, toAuctionHouseAccount, toAuctioneerAccount, toBidReceiptAccount, toListingReceiptAccount, toPurchaseReceiptAccount };
//# sourceMappingURL=accounts.mjs.map
