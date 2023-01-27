import createKeyList from './helpers/createKeyList.js'
import createMultiSignatureAccount from './helpers/createMultiSignatureAccount.js'
import getAccountBalance from './helpers/getAccountBalance.js'
import transferHbars from './helpers/transferHbar.js'

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

const accountId4 = process.env.ACCOUNT_ID_4;
const privateKey4 = process.env.PRIVATE_KEY_4;

// account id and private key is mandatory
// if (myAccountId == null ||
//     myPrivateKey == null) {
//     throw new Error("myAccountId and myPrivateKey is missing in environment");
// }

const client = Client.forTestnet();
client.setOperator(accountId1, privateKey1);


async function main() {
    const keyList = await createKeyList(privateKey1, privateKey2, privateKey3)
    console.log("Key list created: ", keyList)
    const multiSignatureAccId = await createMultiSignatureAccount(client, keyList);
    console.log('\nThe Multi Signature Account ID is: ' + multiSignatureAccId);
    let accountBalance = await getAccountBalance(client, accountId4);
    console.log("Account 4 balance (Initial value): ", accountId4)

    await transferHbars(client, multiSignatureAccId, accountId4, privateKey1, privateKey2)
    accountBalance = await getAccountBalance(client, accountId4);
    console.log("Account 4 balance (After Transfer): ", accountId4)

    process.exit()
}

main()