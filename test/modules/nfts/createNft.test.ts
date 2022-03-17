import test, { Test } from 'tape';
import spok from 'spok';
import { metaplex, spokSamePubkey, spokSameBignum } from '../../utils';
import { JsonMetadata, MetaplexFile } from '../../../src';
import { Keypair } from '@solana/web3.js';
import { UseMethod } from '../../../src/programs/tokenMetadata/generated'

test('it can create an NFT with minimum configuration', async (t: Test) => {
	// Given we have a Metaplex instance.
	const mx = await metaplex();

	// And we uploaded an image.
	const imageFile = new MetaplexFile('some_image');
	const imageUri = await mx.storage().upload(imageFile);

	// And we uploaded some metadata containing this image.
	const metadataUri = await mx.storage().uploadJson<JsonMetadata>({
		name: 'JSON NFT name',
		description: 'JSON NFT description',
		image: imageUri,
	});

	// When we create a new NFT with minimum configuration.
	const nft = await mx.nfts().createNft({
		name: 'On-chain NFT name',
		uri: metadataUri,
	});

	// Then we created and retrieved the new NFT and it has appropriate defaults.
	spok(t, nft, {
		$topic: 'Created NFT',
		name: 'On-chain NFT name',
		uri: metadataUri,
		json: {
			name: 'JSON NFT name',
			description: 'JSON NFT description',
			image: imageUri,
		},
		sellerFeeBasisPoints: 500,
		primarySaleHappened: false,
		updateAuthority: spokSamePubkey(mx.identity().publicKey),
		creators: [
			{
				address: spokSamePubkey(mx.identity().publicKey),
				share: 100,
				verified: true,
			},
		],
		collection: null,
		uses: null,
	});
});

test.only('it can create an NFT with maximum configuration', async (t: Test) => {
	// Given we have a Metaplex instance.
	const mx = await metaplex();

	// And we uploaded an image.
	const imageFile = new MetaplexFile('some_image');
	const imageUri = await mx.storage().upload(imageFile);

	// And a various keypairs for different access.
	const mint = Keypair.generate();
	const collection = Keypair.generate();
	const owner = Keypair.generate();
	const mintAuthority = Keypair.generate();
	const updateAuthority = Keypair.generate();
	const freezeAuthority = Keypair.generate();
	const otherCreator = Keypair.generate();

	// When we create a new NFT with minimum configuration.
	const nft = await mx.nfts().createNft({
		name: 'On-chain NFT name',
		symbol: 'MYNFT',
		json: {
			name: 'JSON NFT name',
			description: 'JSON NFT description',
			image: imageUri,
		},
		sellerFeeBasisPoints: 456,
		isMutable: true,
		maxSupply: 123,
		mint: mint,
		payer: mx.identity(),
		mintAuthority: mintAuthority,
		updateAuthority: updateAuthority,
		owner: owner.publicKey,
		// freezeAuthority: freezeAuthority.publicKey,
		collection: {
			verified: false,
			key: collection.publicKey,
		},
		uses: {
			useMethod: UseMethod.Burn,
			remaining: 0,
			total: 1000,
		},
		creators: [
			{
				address: updateAuthority.publicKey,
				share: 60,
				verified: true,
			},
			{
				address: otherCreator.publicKey,
				share: 40,
				verified: false,
			},
		],
	});

	// Then we created and retrieved the new NFT and it has appropriate defaults.
	console.log(nft);
	spok(t, nft, {
		$topic: 'Created NFT',
		name: 'On-chain NFT name',
		uri: spok.string,
		json: {
			name: 'JSON NFT name',
			description: 'JSON NFT description',
			image: imageUri,
		},
		sellerFeeBasisPoints: 456,
		primarySaleHappened: false,
		updateAuthority: spokSamePubkey(updateAuthority.publicKey),
		// freezeAuthority: spokSamePubkey(freezeAuthority.publicKey),
		collection: {
			verified: false,
			key: spokSamePubkey(collection.publicKey),
		},
		uses: {
			useMethod: UseMethod.Burn,
			remaining: spokSameBignum(0),
			total: spokSameBignum(1000),
		},
		creators: [
			{
				address: spokSamePubkey(updateAuthority.publicKey),
				share: 60,
				verified: true,
			},
			{
				address: spokSamePubkey(otherCreator.publicKey),
				share: 40,
				verified: false,
			},
		],
	});
});

test('it fill missing on-chain data from the JSON metadata', async (t: Test) => {
	// Given we have a Metaplex instance.
	const mx = await metaplex();

	// And an uploaded image.
	const imageFile = new MetaplexFile('some_image');
	const imageUri = await mx.storage().upload(imageFile);

	// And two other creators used in the JSON metadata.
	const creatorA = Keypair.generate().publicKey;
	const creatorB = Keypair.generate().publicKey;
	const json: JsonMetadata = {
		name: 'JSON NFT name',
		symbol: 'MYNFT',
		description: 'JSON NFT description',
		image: imageUri,
		seller_fee_basis_points: 456,
		properties: {
			creators: [
				{
					address: mx.identity().publicKey.toBase58(),
					share: 50,
				},
				{
					address: creatorA.toBase58(),
					share: 30,
				},
				{
					address: creatorB.toBase58(),
					share: 20,
				},
			]
		}
	};

	// When we create a new NFT using that JSON metadata only.
	const nft = await mx.nfts().createNft({ json });

	// Then the created NFT used some of the JSON metadata to fill some on-chain data.
	spok(t, nft, {
		$topic: 'NFT created using JSON metadata only',
		name: 'JSON NFT name',
		symbol: 'MYNFT',
		uri: spok.string,
		json,
		sellerFeeBasisPoints: 456,
		creators: [
			{
				address: spokSamePubkey(mx.identity().publicKey),
				share: 50,
				verified: true,
			},
			{
				address: spokSamePubkey(creatorA),
				share: 30,
				verified: false,
			},
			{
				address: spokSamePubkey(creatorB),
				share: 20,
				verified: false,
			},
		],
	});
});

test('it creates missing JSON metadata from the on-chain data', async (t: Test) => {
	// Given we have a Metaplex instance.
	const mx = await metaplex();

	// And some explicit creators to store on-chain.
	const creatorA = Keypair.generate().publicKey;
	const creatorB = Keypair.generate().publicKey;
	const creators = [
		{
			address: mx.identity().publicKey,
			share: 50,
			verified: true,
		},
		{
			address: creatorA,
			share: 30,
			verified: false,
		},
		{
			address: creatorB,
			share: 20,
			verified: false,
		},
	]

	// When we create a new NFT on-chain data only.
	const nft = await mx.nfts().createNft({
		name: 'On-chain NFT name',
		symbol: 'MYNFT',
		sellerFeeBasisPoints: 456,
		creators,
	});

	// Then the NFT created used some of the on-chain data to create and upload some JSON metadata.
	spok(t, nft, {
		$topic: 'NFT created without explicit metadata',
		name: 'On-chain NFT name',
		symbol: 'MYNFT',
		uri: spok.string,
		json: {
			name: 'On-chain NFT name',
			symbol: 'MYNFT',
			seller_fee_basis_points: 456,
			properties: {
				creators: [
					{
						address: mx.identity().publicKey.toBase58(),
						share: 50,
					},
					{
						address: creatorA.toBase58(),
						share: 30,
					},
					{
						address: creatorB.toBase58(),
						share: 20,
					},
				],
			},
		},
		sellerFeeBasisPoints: 456,
		creators: creators.map(creator => ({
			address: spokSamePubkey(creator.address),
			...creator,
		})),
	});
});
