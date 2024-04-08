"use client";
import { Header, CountDownRenderer, Loader, Footer } from "@/components";
import { random } from "@/libs/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FaRegEdit } from "react-icons/fa";
import TimeAgo from "react-timeago";
import NotePicker from "@/components/TextEditor/NotePicker";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import Link from "next/link";
import { ethers } from "ethers";
import {
  addAnswerFn,
  dislikeAnswerFn,
  distributeMainBountyFn,
  getQuestionFn,
  likeAnswerFn,
} from "@/libs/contractFunctionCall";
import {
  addAnswertoTableFn,
  readAnswersFunc,
  readQuestionFunc,
  updateAnswerFn,
} from "@/libs/TablelandFnCall";

const Question = () => {
  const router = useRouter();
  const [likeError, setLikeError] = useState(true);
  const [isQuestioner, setQuestioner] = useState(false);
  const [data, setData] = useState("");
  const [mainBounty, setMainBounty] = useState(0);
  const [poolBounty, setPoolBounty] = useState(0);
  const [answerData, setAnswerData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState("");
  const [bountyWinner, setBountyWinner] = useState("");
  const [db, setDb] = useState(null);
  const { questions } = router.query;

  const getData = async () => {
    setLoader(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    if (questions) {
      let res = await readQuestionFunc(questions);
      res = res[0];
      console.log(res);
      setData(res);
      if (res?.address == account) {
        setQuestioner(true);
      }

      let res1 = await readAnswersFunc(questions);
      // res1 = res1[0];
      console.log(res1);
      setAnswerData(res1);

      if (res?.time_based) {
        const { _mainBounty, _bountyPool, bountyWinner } = await getQuestionFn(
          signer,
          questions
        );
        setMainBounty(_mainBounty);
        setPoolBounty(_bountyPool);
        setBountyWinner(bountyWinner);
      }
    }

    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, [questions]);

  const addAnswer = async () => {
    if (content) {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const data = {
        answerId: random(),
        questionId: Number(questions),
        addr: account,
        answerText: content,
        timeOfCreation: new Date().toISOString(),
        upvote: 0,
        downvote: 0,
      };
      console.log(data);

      await addAnswertoTableFn(signer, data);

      await addAnswerFn(signer, data.answerId, data.questionId);
      setLoader(false);
      window?.location.reload();
    }
  };
  const updateAnswer = async (answerId, vote, upvote, downvote) => {
    setLoader(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    console.log(answerId, upvote, downvote);
    if (vote) {
      const res = await likeAnswerFn(signer, answerId);
      if (res) {
        document.getElementById("my_modal_1").showModal();
        setLoader(false);
        return;
      }
    } else {
      const res = await dislikeAnswerFn(signer, answerId);
      if (res) {
        document.getElementById("my_modal_1").showModal();
        setLoader(false);
        return;
      }
    }
    await updateAnswerFn(signer, answerId, upvote, downvote);
    setTimeout(() => {
      setLoader(false);
      window?.location.reload();
    }, 1000);
  };

  const giveMainBounty = async (asnwerId) => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const res = await distributeMainBountyFn(signer, questions, asnwerId);
    if (res) {
      setLikeError(false);
      document.getElementById("my_modal_1").showModal();

    }
    setLoader(false);
  };

  return (
    <div>
      {loader && <Loader />}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {likeError ? "Already liked or disliked" : "Bounty already alloted"}
          </h3>
          <p className="py-4">
            {likeError
              ? "You can give only one response!"
              : "Bounty has already been Given"}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setLikeError(true)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <Header />
      <div className="flex mx-32  my-10">
        <div className="w-full flex flex-col gap-6">
          <div className="p-8 border border-[#FFBBDA] rounded-md bg-neutral text-white text-left">
            <h2 className="text-[1.7rem]  font-semibold">{data?.question}f</h2>

            <div className="flex gap-3 my-2">
              {Array.isArray(data?.tags)
                ? data.tags.map((item, index) => (
                    <div
                      key={index}
                      className="badge badge-outline cursor-pointer px-2 py-3 text-sm  font-semibold"
                    >
                      {item}
                    </div>
                  ))
                : ""}
              <div className="text-[#858295] text-sm make-flex gap-1">
                Asked{" "}
                <TimeAgo date={data ? data.time_of_creation : "1 Feb, 2020"} />
              </div>
            </div>
            <div className="w-[900px] max-h-[300px] overflow-y-auto overflow-x-auto">
              <div
                className="my-5"
                dangerouslySetInnerHTML={{ __html: data?.details }}
              />
            </div>

            <div className="asked-section make-flex justify-between">
              <div className="make-flex gap-2">
                {!isQuestioner && (
                  <Link href="#answer" className="btn bg-white rounded-md">
                    <FaRegEdit />
                    Answer
                  </Link>
                )}

                <div className="make-flex gap-3 mr-4 ml-3">
                  <div className="flex font-semibold gap-1">
                    <BiSolidDownvote className=" h-8 w-8 cursor-pointer hover:scale-110 p-1 border rounded-md " />
                    {data ? data.like : 0}
                  </div>
                  <div className="flex font-semibold gap-1">
                    <BiSolidUpvote className=" h-8 w-8 cursor-pointer hover:scale-110 p-1 border rounded-md " />
                    {data ? data.dislike : 0}
                  </div>
                </div>
              </div>
              <div className=" make-flex gap-1 w-32 justify-start">
                <div className="bg-neutral text-neutral-content border border-white rounded-full w-10 h-10 make-flex">
                  <span className="text-xl">D</span>
                </div>
                <div className="h-10 make-flex flex-col items-start">
                  <p className="m-0 leading-5 text-sm font-semibold">
                    {data
                      ? `${data.address?.slice(0, 4)}..${data.address?.slice(
                          data.address?.length - 4
                        )}`
                      : 0}
                  </p>
                  <p className="m-0 leading-5 text-xs">2yr</p>
                </div>
              </div>
            </div>
          </div>

          {/* // ) : (
          //   <span className="loading loading-spinner loading-md"></span>
          // )} */}

          <div className="divider divider-start my-0">Answers</div>
          <div className="flex flex-col gap-5">
            {answerData?.map(
              ({
                address,
                questionId,
                answer_Id,
                answer,
                time_of_creation,
                comments,
                upvote,
                downvote,
              }) => {
                // console.log(answerId);
                return (
                  <div
                    className="py-7 px-8 border  rounded-md text-left"
                    key={answer_Id}
                  >
                    <div className="asked-section make-flex justify-between">
                      <div className=" make-flex gap-1 w-36 justify-start">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 make-flex">
                          <span className="text-xl">D</span>
                        </div>
                        <div className="h-10 make-flex flex-col items-start">
                          <p className="m-0 leading-5 text-sm font-semibold">
                            {address.slice(0, 4)}...
                            {address.slice(address.length - 4)}
                          </p>
                          <p className="m-0 leading-5 text-xs">2yr</p>
                        </div>
                      </div>
                      <div className="text-[#858295] text-sm">
                        Answered{" "}
                        <TimeAgo
                          date={
                            time_of_creation ? time_of_creation : "1 Feb, 2020"
                          }
                        />
                      </div>
                    </div>
                    <div className="w-[900px] max-h-[300px] overflow-y-auto overflow-x-auto my-4">
                      <div
                        className="my-5"
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    </div>
                    <div className="make-flex justify-between gap-3">
                      {isQuestioner ? (
                        <button
                          onClick={() => giveMainBounty(answer_Id)}
                          className="btn btn-neutral text-white "
                        >
                          Give Bounty
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex gap-4">
                        <div className="make-flex font-semibold">
                          <BiSolidUpvote
                            onClick={() =>
                              updateAnswer(answer_Id, 1, upvote + 1, downvote)
                            }
                            className=" h-8 w-8 cursor-pointer hover:scale-110 p-1 border rounded-tl-md rounded-bl-md "
                          />
                          <p className="make-flex h-8 w-8 cursor-pointer p-1 border rounded-tr-md rounded-br-md">
                            {upvote ? upvote : 0}
                          </p>
                        </div>
                        <div className="make-flex  font-semibold ">
                          <BiSolidDownvote
                            onClick={() =>
                              updateAnswer(answer_Id, 0, upvote, downvote + 1)
                            }
                            className=" h-8 w-8 cursor-pointer hover:scale-110 p-1 border rounded-tl-md rounded-bl-md "
                          />
                          <p className="make-flex h-8 w-8 cursor-pointer  p-1 border rounded-tr-md rounded-br-md">
                            {downvote ? downvote : 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
            <div className="divider mb-0 font-semibold text-2xl">
              Your Answer
            </div>
            <div
              className=" text-[1.3rem] cursor-pointer make-flex flex-col items-start"
              id="answer"
            >
              <h2 className=" "></h2>
              <NotePicker content={content} setContent={setContent} />
              <button onClick={() => addAnswer()} className="btn btn-neutral">
                Post your Answer
              </button>
            </div>
          </div>
        </div>

        <div className="ml-5 w-[350px]  text-center">
          {data?.time_based ? (
            <div className="make-flex justify-start flex-col gap-5">
              <div className=" w-full rounded-md p-8 py-6 border">
                <h2 className="text-lg font-semibold leading-9 ">
                  Time Remaining
                </h2>
                <Countdown
                  date={new Date(data?.time_alloted)}
                  renderer={CountDownRenderer}
                />
              </div>
              <div className="w-full rounded-md flex flex-col gap-3 px-7 py-6 border border-black">
                <div>
                  <p className="text-lg font-semibold leading-5 mb-2">
                    Winner Bounty
                  </p>
                  <h2 className="text-[2rem] h-14 font-semibold  leading-tight make-flex gap-2 bg-neutral rounded-md text-white my-1">
                    {mainBounty ? ethers.utils.formatEther(mainBounty) : "0"}eth
                  </h2>
                </div>
                <div>
                  <p className="text-lg font-semibold leading-5 mb-2">
                    Pool Bounty
                  </p>
                  <h2 className="text-[2rem] h-14 font-semibold  leading-tight make-flex gap-2 bg-neutral rounded-md text-white my-1">
                    {poolBounty ? ethers.utils.formatEther(poolBounty) : "0"}eth
                  </h2>
                </div>
              </div>
              <div className=" w-full rounded-md flex flex-col gap-3 px-7 py-5 border ">
                <h3 className="font-semibold">Main Bounty Winner</h3>
                <p className="text-[1.5rem] font-semibold leading-7">
                  {bountyWinner.slice(0, 6)}....
                  {bountyWinner.slice(bountyWinner.length - 5)}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full rounded-md p-8 border  text-[2rem] font-bold">
              No Bounty Active
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
