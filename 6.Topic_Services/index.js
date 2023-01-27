import createTopic from './helpers/createTopic.js'
import submitMessage from './helpers/submitMessage.js'
import subscribeTopic from './helpers/subscribeTopic.js'

import dotenv from 'dotenv'
dotenv.config()

import {
    Client
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
    const topicId = await createTopic(client);
    console.log("TOPIC ID: ", topicId.toString());
    let currentTime = new Date().getTime();

    let topicMessage = "This messege submitted at " + currentTime
    console.log("topicmessage", topicMessage)
    await submitMessage(client, topicId, topicMessage);

    await subscribeTopic(client, topicId);
}

main()