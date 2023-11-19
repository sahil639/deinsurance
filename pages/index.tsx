import React, { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Web3Modal from "web3modal";

import { GenerateProof } from "@reclaimprotocol/reclaim-connect-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { set } from "mongoose";
// Import Push SDK & Ethers
import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import env from "react-dotenv";
import contractABI from "../contract/src/insurance-abi.json";
import { send } from "@pushprotocol/restapi/src/lib/chat";
import { IssueInsurance } from "./utils/issue-insurance";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { isConnected, address } = useAccount();
  const [salary, setSalary] = useState(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [events, setEvents] = useState([]);
  const [policyId, setPolicyId] = useState("asd");
  const [callIssueInsurance, setCallIssueInsurance] = useState(false);

  const sendNotification = async () => {
    try {
      if (!isConnected || !address) {
        return;
      }

      // Create an ethers Wallet instance from the public key
      if (policyId) {
        const web3Modal = new Web3Modal();
        const modalProvider = await web3Modal.connect();
        const signer = new ethers.providers.Web3Provider(
          modalProvider
        ).getSigner();

        // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
       
        const userAlice = await PushAPI.initialize(signer, {
             //@ts-ignore
          env: process.env.PUSH_ENV,
        });
        console.log(userAlice);

        // Send a notification to users of your protocol
        const apiResponse = await userAlice.channel.send(["*"], {
          notification: {
            title: "Insurance Plan",
            body:
              "Your insurance plan has been initiated with Policy ID: " +
              policyId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isConnected || !address) {
      window.location.href = "/connect";
    }
  }, [isConnected, address]);

  useEffect(() => {
    const init = async () => {
      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Load your contract
      const contractAddress = "0x58AE427Fbd2e6C14ab590874772517aD48d8d421"; // Replace with your contract address
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      // Set the contract in the state
      setContract(contract);

      // Subscribe to events
      contract.on(
        "InsuranceIssued",
        (policyId, insuredEvent, insuranceAmount, payoutAddress) => {
          console.log("Insurance Purchased Id:", policyId);
          setPolicyId(policyId);
          // Update state with the new event
        }
      );
    };

    init();
  }, []);

  useEffect(() => {
    if (policyId !== "") {
      const notificationCall = async () => {
        await sendNotification();
      };
      notificationCall();
      window.location.href = "/profile";
    }
  }, [policyId]);

  const NavBar = () => (
    <div className="flex flex-row font-bold text-lg fixed top-0 left-0 right-0 justify-between items-center py-3 shadow-sm px-10 bg-white">
      DESURANCE
    </div>
  );
  return (
    <div className="w-full bg-gray-100 h-screen flex justify-center items-center">
      <NavBar />

      <div
        className="flex flex-col py-2 px-2
                    justify-center items-center 
                
                "
      >
        <h1
          className="text-6xl
                text-left
                font-bold text-gray-900
                my-3
                "
        >
          DESURANCE
        </h1>
        <p className="text-xl text-center text-gray-900 ">
          Provide Job insurance for all Startup workers across
          <br />
          the world while keeping their data anonymous.
        </p>
        <Card
          className="flex flex-col p-6 mt-10 items-center justify-center"
          style={{ opacity: salary > 0 ? 0.5 : 1 }}
        >
          <h1 className="text-2xl font-semibold shado   text-gray-900 text-left mb-4 mx-auto">
            Add your proof of employment
          </h1>

          <GenerateProof
            customize={{
              triggerButton: {
                style: {
                  backgroundColor: "rgb(132 204 22)",
                  color: "white",
                  boxShadow: "none",
                },
              },
            }}
            appID="e840ba05-6991-48ab-8371-1be0736fb4a5"
            userID={uuidv4()}
            onProofSubmission={(proofs, sessionId) => {
              console.log(proofs, sessionId);
              const proof = proofs[0];
              setSalary(Number(proof.extractedParameterValues.CLAIM_DATA));
              alert("success");
            }}
            onProofSubmissionFailed={() => {
              alert("failed");
            }}
          />
        </Card>
        {salary > 0 && (
          <div
            className="flex flex-col py-20 px-2
            justify-center items-center margin-top: 20px;
                    "
          >
            <h1
              className="text-3xl
                    text-left
                 text-gray-800
                    my-1
                    "
            >
              RECOMMENDED INSURANCE PLAN
            </h1>
            <Card
              className="flex flex-col p-8 mt-16 items-center justify-center my-6
                  "
            >
              <h1 className="text-2xl font-semibold shado   text-gray-900 text-left mb-4 mx-auto">
                Insurance Plan
              </h1>
              <p className="item-centre justify-centre my-2">
                A premium of 0.5% of your salary: {salary * 0.005}$/month <br />{" "}
                To cover 3 months of unemployment
              </p>
              <button
                className="bg-green-500 text-white rounded-lg px-4 py-2 my-3"
                onClick={() => {
                  setCallIssueInsurance(true);
                }}
              >
                Buy Insurance
              </button>
              {callIssueInsurance && (
                <IssueInsurance amount={salary * 0.005!} userAddr={address!} />
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
