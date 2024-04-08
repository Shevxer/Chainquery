import { Header, Loader } from "@/components";
import { collectBountyFn } from "@/libs/contractFunctionCall";
import {
  readAnswerTableFunc,
  readQuestionTableFunc,
} from "@/libs/TablelandFnCall";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getQuestions = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    const result = await readQuestionTableFunc();

    setQuestionData(result.filter((item) => item.address === account));
    setLoader(false);
  };

  const getAnswer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    const result = await readAnswerTableFunc();
    console.log(result)
    setAnswerData(result.filter((item) => item.address === account));
    setLoader(false);
  };

  const collectBountyPool = async (questionId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const res = await collectBountyFn(signer, questionId);
    if (res) {
      document.getElementById("my_modal_1").showModal();
    }
  };

  useEffect(() => {
    getAnswer();
    getQuestions();
  }, []);
  return (
    <div>
      <Header />

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Bounty already claimed!</h3>
          <p className="py-4">Bounty has already been distributed.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <h2 className="text-center text-[1.5rem] font-bold my-2">
        Your Dashboard
      </h2>
      {loader ? (
        <Loader />
      ) : (
        <div
          role="tablist"
          className="tabs tabs-bordered  mx-60 mt-7 rounded-xl mb-20"
        >
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Questions"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-md p-3"
          >
            <div className="flex flex-col gap-2">
              {questionData?.map(({ question, question_id }, index) => {
                return (
                  <Link
                    href={`/questions/${question_id}`}
                    className="font-semibold text-[1.2rem]  hover:bg-[#f5f5f5] rounded-md p-4"
                    key={index}
                  >
                    {index + 1}. {question}
                  </Link>
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Answers"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-md p-3"
          >
            <div className="flex flex-col gap-2">
              {answerData?.map(({ answer, question_Id }, index) => {
                return (
                  <div
                    className="font-semibold hover:bg-[#f5f5f5] rounded-md p-4"
                    key={index}
                  >
                    Ans {index + 1}.{" "}
                    <Link
                      href={`/questions/${question_Id}`}
                      className="my-1 mb-2"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                    <button
                      onClick={() => collectBountyPool(question_Id)}
                      className="btn btn-sm btn-neutral"
                    >
                      collect Bounty
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
