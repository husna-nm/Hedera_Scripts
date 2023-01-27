import {
    Client,
    ContractExecuteTransaction,
    PrivateKey,
    ContractCreateFlow,
    ContractFunctionParameters,
} from '@hashgraph/sdk'
import { hethers } from '@hashgraph/hethers';

import contractJSON from '../artifacts/CertificationC1.json' assert { type: "json" };

export default async function contractService(client) {
    // privateKey1 = PrivateKey.fromString(privateKey1)
    // const contractJSON = {
    //     "_format": "hh-sol-artifact-1",
    //     "contractName": "CertificationC1",
    //     "sourceName": "contracts/certificationC1.sol",
    //     "abi": [
    //       {
    //         "inputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "constructor"
    //       },
    //       {
    //         "inputs": [
    //           {
    //             "internalType": "uint16",
    //             "name": "a",
    //             "type": "uint16"
    //           },
    //           {
    //             "internalType": "uint16",
    //             "name": "b",
    //             "type": "uint16"
    //           }
    //         ],
    //         "name": "function1",
    //         "outputs": [
    //           {
    //             "internalType": "uint16",
    //             "name": "result",
    //             "type": "uint16"
    //           }
    //         ],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //       },
    //       {
    //         "inputs": [
    //           {
    //             "internalType": "uint16",
    //             "name": "a",
    //             "type": "uint16"
    //           }
    //         ],
    //         "name": "function2",
    //         "outputs": [
    //           {
    //             "internalType": "uint16",
    //             "name": "result",
    //             "type": "uint16"
    //           }
    //         ],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //       }
    //     ],
    //     "bytecode": "0x608060405234801561001057600080fd5b506101ca806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806382c56fc71461003b578063b572c25414610065575b600080fd5b61004e6100493660046100d9565b610078565b60405161ffff909116815260200160405180910390f35b61004e61007336600461010c565b61009d565b60006100848284610144565b3360009081526020819052604090204390559392505050565b60006100aa82600261016e565b33600090815260016020526040902043905592915050565b803561ffff811681146100d457600080fd5b919050565b600080604083850312156100ec57600080fd5b6100f5836100c2565b9150610103602084016100c2565b90509250929050565b60006020828403121561011e57600080fd5b610127826100c2565b9392505050565b634e487b7160e01b600052601160045260246000fd5b600061ffff808316818516818304811182151516156101655761016561012e565b02949350505050565b600061ffff80831681851680830382111561018b5761018b61012e565b0194935050505056fea2646970667358221220a9fe55788805f5b4c17059989a195462fdaa02b823797d6588ddf2fc2a75a68a64736f6c634300080f0033",
    //     "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100365760003560e01c806382c56fc71461003b578063b572c25414610065575b600080fd5b61004e6100493660046100d9565b610078565b60405161ffff909116815260200160405180910390f35b61004e61007336600461010c565b61009d565b60006100848284610144565b3360009081526020819052604090204390559392505050565b60006100aa82600261016e565b33600090815260016020526040902043905592915050565b803561ffff811681146100d457600080fd5b919050565b600080604083850312156100ec57600080fd5b6100f5836100c2565b9150610103602084016100c2565b90509250929050565b60006020828403121561011e57600080fd5b610127826100c2565b9392505050565b634e487b7160e01b600052601160045260246000fd5b600061ffff808316818516818304811182151516156101655761016561012e565b02949350505050565b600061ffff80831681851680830382111561018b5761018b61012e565b0194935050505056fea2646970667358221220a9fe55788805f5b4c17059989a195462fdaa02b823797d6588ddf2fc2a75a68a64736f6c634300080f0033",
    //     "linkReferences": {},
    //     "deployedLinkReferences": {}
    //   }
      
    const abicoder = new hethers.utils.AbiCoder();
    //Extracting bytecode from compiled code
    const bytecode = contractJSON.bytecode;

    //Create the transaction
    const contractCreation = new ContractCreateFlow().setGas(100000).setBytecode(bytecode);

    //Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = await contractCreation.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the new contract ID
    const contractId = receipt.contractId;

    console.log('The contract ID is ' + contractId);

    //Create the transaction to call function1
    const firstFunctionExecution = new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction('function1', new ContractFunctionParameters().addUint16(100).addUint16(400));

    //Submit the transaction to a Hedera network and store the response
    const submitFirstFunctionExec = await firstFunctionExecution.execute(client);

    const record = await submitFirstFunctionExec.getRecord(client);

    const encodedResult1 = '0x' + record.contractFunctionResult.bytes.toString('hex');

    const result1 = abicoder.decode(['uint16'], encodedResult1);

    console.log('Function 1 Output :', result1[0]);

    //Create the transaction to update the contract message
    const submitSecondFunctionExec = new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction('function2', new ContractFunctionParameters().addUint16(result1[0]));

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx2 = await submitSecondFunctionExec.execute(client);

    const record2 = await submitExecTx2.getRecord(client);

    const encodedResult2 = '0x' + record2.contractFunctionResult.bytes.toString('hex');

    const result2 = abicoder.decode(['uint16'], encodedResult2);

    console.log('Function 2 Output :', result2[0]);

};

