# Task 2
Create a script that creates a non-fungible token with the Hedera
Token Service belonging to Account1.
Set the initial supply to 0 and the maxSupply for 5. Create a
custom royalty fee of 10% and a fallback fee of 200 Hbar paid to
Account2.
Create a second script that mints all 5 NFTs with the Metadata
“NFT x” and sends the second NFT to Account3.

## Instructions
- using node v18.9.0 (npm v8.19.1)
- Clone Repo
- go to root (2.NonFungibleToken)
- `npm install`

### To run script
run command  `npm start`

### output

NFT is Created with TokenId: 0.0.13833 

TOKENID:  0.0.13833
- Created NFT 0.0.13833 with serial: 1 

- Created NFT 0.0.13833 with serial: 2 

- Created NFT 0.0.13833 with serial: 3 

- Created NFT 0.0.13833 with serial: 4 

- Created NFT 0.0.13833 with serial: 5 

- Token association with the users account: SUCCESS 


- NFT transfer from Treasury to Buyer: SUCCESS 

- Buyer's balance: 1 NFTs of ID 0.0.13833