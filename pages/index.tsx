import React, { useEffect, useState } from "react";
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

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { isConnected, address } = useAccount();
  const [salary, setSalary] = useState(1);

  useEffect(() => {
    if (!isConnected || !address) {
      window.location.href = "/connect";
    }
  }, [isConnected, address]);

  const sendNotification = async () => {
    try {
      if (!isConnected || !address) {
        return;
      }

      // Create an ethers Wallet instance from the public key
      const web3Modal = new Web3Modal();
      const modalProvider = await web3Modal.connect();
      const signer = new ethers.providers.Web3Provider(
        modalProvider
      ).getSigner();

      // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
      const userAlice = await PushAPI.initialize(signer, { env: process.env.PUSH_ENV });
      console.log(userAlice);

      // Send a notification to users of your protocol
      const apiResponse = await userAlice.channel.send(["*"], {
        notification: {
          title: "Insurance Plan",
          body: "Your insurance plan has been initiated",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          className="flex flex-col p-6 mt-10 items-center justify-center
                "
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
          <Card
            className="flex flex-col p-10 mt-16 items-center justify-center
                  "
          >
            <h1 className="text-2xl font-semibold shado   text-gray-900 text-left mb-4 mx-auto">
              Insurance Plan
            </h1>
            <p className="item-centre justify-centre my-3">
              A premium of 0.5% of your salary: {salary * 0.005}$/month <br />{" "}
              To cover 3 months of unemployment
            </p>
            <button
              className="bg-green-500 text-white rounded-lg px-4 py-2 my-3"
              onClick={sendNotification}
            >
              Buy Insurance
            </button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
