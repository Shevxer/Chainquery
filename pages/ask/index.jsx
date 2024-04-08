"use client";
import { Header, Loader } from "@/components";
import NotePicker from "@/components/TextEditor/NotePicker";
import React, { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { blockchainList, random } from "@/libs/constant";
import Link from "next/link";
import { addQuestionToTableFn } from "@/libs/TablelandFnCall";
import { addQuestionFn } from "@/libs/contractFunctionCall";

const tagsData = [
  { id: 1, tag: "smart-contracts" },
  { id: 2, tag: "solidity" },
  { id: 3, tag: "ethers.js" },
  { id: 4, tag: "truffle" },
  { id: 5, tag: "eth-wallet" },
  { id: 6, tag: "ether" },
  { id: 7, tag: "ethereum-classic" },
  { id: 8, tag: "gas" },
  { id: 9, tag: "blockchain" },
  { id: 10, tag: "erc-20" },
  { id: 11, tag: "Defi" },
  { id: 12, tag: "metamask" },
  { id: 13, tag: "ganache" },
  { id: 14, tag: "web3.py" },
  { id: 16, tag: "filecoin" },
  { id: 17, tag: "ipfs" },
  { id: 18, tag: "tableland" },
  { id: 19, tag: "fil" },
  { id: 20, tag: "filecoin-mining" },
];

const Ask = () => {
  const router = useRouter();
  const [bountyFlag, setBountyFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [poolBounty, setpoolBounty] = useState("");
  const [winnerBounty, setWinnerBounty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (bountyFlag) document.getElementById("my_modal_4").showModal();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    // console.log(title, tags, content);

    // Code here=
    if (!bountyFlag) {
    }
    setLoader(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  const handleBountySubmit = async () => {
    console.log(poolBounty, winnerBounty, deadline, typeof deadline);
    setLoader(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    console.log(deadline, Math.floor(new Date().getTime() / 1000));

    const data = {
      questionId: random(),
      addr: account,
      questionText: title,
      details: content,
      tags: JSON.stringify(tags),
      timeOfCreation: new Date().toISOString(),
      timeBased: 1,
      timeAllotted: deadline,
      upvote: 0,
      downvote: 0,
    };
    console.log(data);

    await addQuestionToTableFn(signer, data);

    console.log(ethers.utils.parseEther(winnerBounty, "ether"));
    const _bountyPool = Number(ethers.utils.parseUnits(poolBounty, "ether"));
    const _mainBounty = Number(ethers.utils.parseUnits(winnerBounty, "ether"));
    await addQuestionFn(signer, {
      _questionId: data.questionId,
      _bountyBased: true,
      _mainBounty,
      _bountyPool,
      _timeOfBounty: Math.floor(new Date().getTime() / 1000),
    });
    router.push(`/questions/${data.questionId}`);
    setLoader(false);
  };

  return (
    <div>
      {loader && <Loader />}

      <Header />

      <h2 className="text-center text-[3rem] text-black font-bold my-2 mb-14">
        Ask Public Question
      </h2>
      <div className="mx-40 border border-black py-14 px-24 rounded-md">
        <form
          className="flex  flex-col gap-6"
          id="myForm"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full ">
            <div className="label flex flex-col items-start">
              <span className="label-text text-lg font-semibold">Title</span>
              <span className="label-text text-sm ">
                Clearly articulate your question as if you're conversing with
                someone else
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-bordered border-[#000000] rounded-sm w-full text-black"
            />
          </label>
          <div className="flex justify-between">
            <label className="form-control w-full ">
              <div className="label flex flex-col items-start">
                <span className="label-text text-lg font-semibold">Tag</span>
                <span className="label-text text-sm ">
                  Choose tags that are relevant to your question
                </span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs rounded-sm border-[#000000]"
                required
                onChange={(e) => setTags([...tags, e.target.value])}
              >
                <option disabled value={"hh"}>
                  Select an Option
                </option>
                {tagsData.map(({ tag, id }) => (
                  <option key={id}>{tag}</option>
                ))}
              </select>
            </label>
            <label className="form-control w-full ">
              <div className="label flex flex-col items-start">
                <span className="label-text text-lg font-semibold">Chain</span>
                <span className="label-text text-sm ">
                  Select chain related to your question
                </span>
              </div>
              <select
                className="select select-bordered w-full rounded-sm max-w-xs border-[#000000]"
                required
                onChange={(e) => setTags([...tags, e.target.value])}
              >
                <option disabled value={"hh"}>
                  Select an Option
                </option>
                {blockchainList.map(({ chain, id }) => (
                  <option key={id}>{chain}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="make-flex justify-start gap-3">
            {tags.map((item, index) => (
              <div key={index} className="badge badge-outline">
                {item}
              </div>
            ))}
          </div>
        </form>
        <div>
          <div className="label flex flex-col items-start">
            <span className="label-text text-lg font-semibold">Body</span>
            <span className="label-text text-sm ">
              Include all information someone would need to answer your question
            </span>
          </div>
          <NotePicker content={content} setContent={setContent} />
        </div>
        <div className="flex justify-start gap-2">
          <button
            className="btn btn-outline w-40"
            type="submit"
            form="myForm"
            onSubmit={submitForm}
            onClick={() => setBountyFlag(true)}
          >
            Submit
          </button>
          <Link href="/ask-AI" className="btn bg-neutral  text-white  w-36  ">
            Ask AI
            <FaWandMagicSparkles />
          </Link>
        </div>
        <dialog id="my_modal_4" className="modal ">
          <div className="modal-box w-3/5 rounded-md">
            <h3 className="font-bold text-lg mb-2">Add Bounty</h3>
            <form className="flex flex-col gap-2" onSubmit={handleBountySubmit}>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Pool Bounty Amount
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="add amount in Eth"
                  required
                  value={poolBounty}
                  onChange={(e) => setpoolBounty(e.target.value)}
                  className="input input-bordered border-[#000000] w-full rounded-sm"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Winner Bounty Amount
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="add amount in Eth"
                  required
                  value={winnerBounty}
                  onChange={(e) => setWinnerBounty(e.target.value)}
                  className="input input-bordered border-[#000000] w-full rounded-sm"
                />
              </label>

              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Select Time
                  </span>
                </div>
                <input
                  type="datetime-local"
                  placeholder="add amount in $"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="input input-bordered border-[#000000] w-full rounded-sm"
                />
              </label>
            </form>
            <div className="modal-action w-full make-flex">
              {loader ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                <button
                  className="btn btn-neutral mx-auto w-32"
                  onClick={() => handleBountySubmit()}
                  disabled={!deadline && !winnerBounty && !poolBounty}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Ask;
