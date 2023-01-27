import {
    AccountBalanceQuery, TokenAssociateTransaction, TransferTransaction,PrivateKey
} from "@hashgraph/sdk";

export default async function transferNFt(client, accountId1, accountId3, privateKey1, privateKey3, tokenId, slNo) {
    privateKey1 = PrivateKey.fromString(privateKey1)
    privateKey3 = PrivateKey.fromString(privateKey3)
    //  Before an account that is not the treasury for a token can receive or send this specific token ID, the account
    //  must become “associated” with the token.
    let associateBuyerTx = await new TokenAssociateTransaction()
        .setAccountId(accountId3)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(privateKey3)

    //SUBMIT THE TRANSACTION
    let associateBuyerTxSubmit = await associateBuyerTx.execute(client);

    //GET THE RECEIPT OF THE TRANSACTION
    let associateBuyerRx = await associateBuyerTxSubmit.getReceipt(client);

    //LOG THE TRANSACTION STATUS
    console.log(`- Token association with the users account: ${associateBuyerRx.status} \n`);

    // Transfer the NFT from treasury to Alice
    // Sign with the treasury key to authorize the transfer
    let tokenTransferTx = await new TransferTransaction()
        .addNftTransfer(tokenId, slNo, accountId1, accountId3)
        .freezeWith(client)
        .sign(privateKey1);

    let tokenTransferSubmit = await tokenTransferTx.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    console.log(`\n- NFT transfer from Treasury to Buyer: ${tokenTransferRx.status} \n`);

    // Check the balance of Alice's account after the transfer
    let balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId3).execute(client);
    console.log(`- Buyer's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

}

