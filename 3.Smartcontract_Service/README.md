# Task 3
Download and deploy the solidity bytecode given below using the
Hedera Smart Contract Service and Account1. Call function
“function1” with parameters “4” and “3” and print the answer you
receive. Hint: there are 2 input parameters, and you will receive a
return value. Further information is in the ABI file. All parameters
are of type “uint16”.
Create a second transaction using function “function2” and supply
the result of “function1” as the input.
Extra credit: Decode and print the return value from the
transactions using ABI decoding.

## Instructions
- using node v18.9.0 (npm v8.19.1)
- Clone Repo
- go to root (3.Smartcontract_Service)
- `npm install`

### To run script
run command  `npm start`

### output
The contract ID is 0.0.16731
Function 1 Output : 40000
Function 2 Output : 40002

