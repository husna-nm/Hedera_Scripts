import createNft from './helpers/createNFT.js'
import mintNft from './helpers/mintNFT.js'
import transferNFt from './helpers/transferNFt.js'

import dotenv from 'dotenv'
dotenv.config()
import {
    Client, Wallet, LocalProvider
} from "@hashgraph/sdk";
// import MirrorChannel from '@hashgraph/sdk/lib/channel/MirrorChannel.js';

//Grab your Hedera testnet account ID and private key from your .env file
const accountId1 = process.env.ACCOUNT_ID_1;
const privateKey1 = process.env.PRIVATE_KEY_1;

const accountId2 = process.env.ACCOUNT_ID_2;
const privateKey2 = process.env.PRIVATE_KEY_2;

const accountId3 = process.env.ACCOUNT_ID_3;
const privateKey3 = process.env.PRIVATE_KEY_3;


// account id and private key is mandatory
if (accountId1 == null ||
    privateKey1 == null) {
    throw new Error("myAccountId and myPrivateKey is missing in environment");
}

const treasuryWallet = new Wallet(
    accountId1,
    privateKey1,
    new LocalProvider()
);

const client = Client.forTestnet();
client.setOperator(accountId1, privateKey1);


async function main() {
    const tokenId = await createNft(client, accountId1, privateKey1, accountId2)
    console.log("TOKENID: ", tokenId.toString())
    let metadata = "NFT x";
    for (let i = 1; i <= 5; i++) {
        await mintNft(client, tokenId, privateKey1, metadata);
    }
    await transferNFt(client, accountId1, accountId3, privateKey1, privateKey3, tokenId, 2)
    // await mintAndTransferNFT(client, myAccountId, myPrivateKey, adminUser, supplyUser)
    process.exit()
}

main()

// Create a script that creates a non-fungible token with the Hedera
// Token Service belonging to Account1.
// Set the initial supply to 0 and the maxSupply for 5. Create a
// custom royalty fee of 10% and a fallback fee of 200 Hbar paid to
// Account2.
// Create a second script that mints all 5 NFTs with the Metadata
// “NFT x” and sends the second NFT to Account3.