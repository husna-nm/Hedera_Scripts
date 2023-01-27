import createAccount from './helpers/createAccounts.js'
import getAccountBalance from './helpers/getAccountBalance.js'
// import transferHbars from './helpers/transferHbar.js'

import dotenv from 'dotenv'
dotenv.config()
import {
    Client, Wallet, LocalProvider
} from "@hashgraph/sdk";
// import MirrorChannel from '@hashgraph/sdk/lib/channel/MirrorChannel.js';

//Grab your Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

// account id and private key is mandatory
if (myAccountId == null ||
    myPrivateKey == null) {
    throw new Error("myAccountId and myPrivateKey is missing in environment");
}

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);


async function main() {
    let accountBalance;
    for (let i = 1; i <= 5; i++) {
        console.log("________________________________")
        console.log("ACCOUNT_ID:", i)
        const accountId = await createAccount(client);
        console.log(`ACCOUNT ID:  ${accountId.toString()}`);
        accountBalance = await getAccountBalance(client, accountId);
        console.log("ACCOUNT BALANCE: ", accountBalance.hbars.toString());
        console.log("________________________________")
    }
    // let transferAmountHbar = 1000;
    // await transferHbars(client,myAccountId, '0.0.12739', transferAmountHbar)
    process.exit()
}

main()