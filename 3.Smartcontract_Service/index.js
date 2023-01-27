import contractService from './helpers/contractService.js'

import dotenv from 'dotenv'
dotenv.config()
import {
    Client, Wallet, LocalProvider
} from "@hashgraph/sdk";
// import MirrorChannel from '@hashgraph/sdk/lib/channel/MirrorChannel.js';

//Grab your Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.ACCOUNT_ID_1;
const myPrivateKey = process.env.PRIVATE_KEY_1;

// account id and private key is mandatory
if (myAccountId == null ||
    myPrivateKey == null) {
    throw new Error("myAccountId and myPrivateKey is missing in environment");
}

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);


async function main() {
    await contractService(client)
    process.exit()
}

main()