
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from "ethers";
import contractABI from '../../contract/src/insurance-abi.json';

export function IssueInsurance({amount, userAddr}: {amount: Number, userAddr: string}) {

    const [isPrepared, setIsPrepared] = useState(false);


    const SmartContractAddress = '0x58AE427Fbd2e6C14ab590874772517aD48d8d421';

    // console.log("The claim data is: ", claimData);

    // console.log("The args are: ", [[proofObj.epoch, proofObj.provider, proofObj.parameters, proofObj.context, claimData, proofObj.signatures, identity?.commitment]]);

    const { config } = usePrepareContractWrite({
        address: SmartContractAddress,
        abi: contractABI,
        functionName: 'issueInsurance',
        args: [amount, userAddr, '0x000000'],
        chainId: 80001,
        onSuccess(data) {
            console.log('Successful - register prepare: ', data);
            setIsPrepared(true);
        },
        onError(error) {
            console.log('Error in verify Proof: ', error);
            // window.alert('Error: Try by manually switching network to Optimism Goerli testnet.\nRPC: https://goerli.optimism.io\nChain Id: 420\ncheck console.log if this doesn\'t work either.')
        }
    });

    const contractWrite = useContractWrite(config);
    return (
        <>
            {/* { // verify proof on chain and register identity
                !contractWrite.isSuccess &&
                <div className='button-container' onLoad={() => { contractWrite.write?.()}}>
                    <div>Verifying proofs and registering identity</div>
                    <div className="loading-spinner"/>
                </div>
            } */}
            { !contractWrite.isSuccess &&
            <div className='button-container'>
                <button
                    className="glow-on-hover"
                    onClick={()=>{ contractWrite.write?.() }}
                    disabled={contractWrite.isLoading || contractWrite.isSuccess || !isPrepared}
                > {contractWrite.isSuccess ? 'Success' : 'Issue Insurance'}
                </button>
                {contractWrite.isLoading && <div className='loading-spinner'/>}
            </div>
        }
        </>
    )
}