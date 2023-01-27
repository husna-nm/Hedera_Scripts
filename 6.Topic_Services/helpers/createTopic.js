import {
    TopicCreateTransaction
} from "@hashgraph/sdk";

export default async function createTopic(client) {
    //Create a new topic
    let txResponse = await new TopicCreateTransaction().execute(client);
    console.log("Txn Response: ", txResponse.transactionId.toString());
    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client);
    console.log("Txn Receipt: ", receipt.status.toString());
    //Grab the new topic ID from the receipt
    let topicId = receipt.topicId;

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);
    // Wait 5 seconds between consensus topic creation and subscription
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return topicId;

}

