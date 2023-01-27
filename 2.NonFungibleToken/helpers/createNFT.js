import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
    PrivateKey
} from "@hashgraph/sdk";

export default async function createNft(client, account1, account1PrivateKey, accountId2) {
    account1PrivateKey = PrivateKey.fromString(account1PrivateKey)
    // DEFINE CUSTOM FEE SCHEDULE (50% royalty fee - 5/10ths)  
    let nftCustomFee = new CustomRoyaltyFee()
        .setNumerator(10)
        .setDenominator(100)
        .setFeeCollectorAccountId(accountId2)
        //the fallback fee is set to 200 hbar.
        .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));

    let nftCreate = await new TokenCreateTransaction()
        .setTokenName("My First Nft")
        .setTokenSymbol("HNFT")
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(account1)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(5)
        .setCustomFees([nftCustomFee])
        .setSupplyKey(account1PrivateKey)
        .freezeWith(client);

    //Sign the transaction with the treasury key
    let nftCreateTxSign = await nftCreate.sign(account1PrivateKey);

    //Submit the transaction to a Hedera network
    let nftCreateSubmit = await nftCreateTxSign.execute(client);

    //Get the transaction receipt
    let nftCreateRx = await nftCreateSubmit.getReceipt(client);

    //Get the token ID
    let tokenId = nftCreateRx.tokenId;

    //Log the token ID
    console.log(`NFT is Created with TokenId: ${tokenId} \n`);

    return tokenId;
}

