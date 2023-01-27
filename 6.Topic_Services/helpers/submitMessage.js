import {
    TopicMessageSubmitTransaction
} from "@hashgraph/sdk";

export default async function submitMessage(client, topicId, topicMessage) {
    // Send one message
    let sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: topicMessage,
    }).execute(client);

    //Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);

    //Get the status of the transaction
    const transactionStatus = getReceipt.status;
    console.log("The message transaction status: " + transactionStatus.toString());
}
