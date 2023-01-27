import {
    TopicMessageQuery
} from "@hashgraph/sdk";

export default async function subscribeTopic(client, topicId) {
    //Create the query to subscribe to a topic
    new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(
            client,
            (message) => console.log(Buffer.from(message.contents, "utf8").toString())
        );
}
