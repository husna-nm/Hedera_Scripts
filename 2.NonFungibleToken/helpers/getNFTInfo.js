import {
    TokenNftInfoQuery,
    NftId,
    TokenId,
    AccountId
} from "@hashgraph/sdk";

export default async function getNFTInfo(client, tokenId, NFTTokenIndex) {
    console.log(`Searching for NFT ID ${NFTTokenIndex} on token ${tokenId}`);
    //Returns the info for the specified NFT ID
    const nftInfos = await new TokenNftInfoQuery()
        .setNftId(new NftId(TokenId.fromString(tokenId), NFTTokenIndex))
        .execute(client);

    console.log("The ID of the token is: " + nftInfos[0].nftId.tokenId.toString());
    console.log("The serial of the token is: " + nftInfos[0].nftId.serial.toString());
    console.log("The metadata of the token is: " + nftInfos[0].metadata.toString());
    console.log("Current owner: " + new AccountId(nftInfos[0].accountId).toString());
}

