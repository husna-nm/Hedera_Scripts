import createScheduleTransaction from './helpers/createScheduleTransaction.js'
import getScheduleInfo from './helpers/getScheduledTxInfo.js'
import submitScheduledTxn from './helpers/submitSignature.js'

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


// account id and private key is mandatory
// if (myAccountId == null ||
//     myPrivateKey == null) {
//     throw new Error("myAccountId and myPrivateKey is missing in environment");
// }

// const wallet = new Wallet(
//     accountId1,
//     privateKey2,
//     new LocalProvider()
// );

const client = Client.forTestnet();
client.setOperator(accountId1, privateKey1);


async function main() {
    let currentTime = new Date().getTime();
    let memo = "This messege submitted at " + currentTime
    const scheduletransactionEncoded = await createScheduleTransaction(client, accountId1, accountId2, privateKey1, memo)
    const scheduleId =  await submitScheduledTxn(client, privateKey1, scheduletransactionEncoded)
    await getScheduleInfo(client, scheduleId);

    process.exit()
}

main()