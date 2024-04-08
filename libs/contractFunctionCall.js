import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract/constant";

export const addQuestionFn = async (signer, data) => {
  const { _questionId, _bountyBased, _mainBounty, _bountyPool, _timeOfBounty } =
    data;
  console.log(
    _questionId,
    _bountyBased,
    _mainBounty,
    _bountyPool,
    _timeOfBounty
  );
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.createQuestion(
      _questionId,
      _bountyBased,
      _mainBounty,
      _bountyPool,
      _timeOfBounty,
      { value: _mainBounty + _bountyPool }
    );
    await tx.wait();
    console.log(tx);
    // Handle the transaction response or receipt as needed
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const addAnswerFn = async (signer, answerId, questionId) => {
  console.log(answerId, questionId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.createAnswer(answerId, questionId);
    await tx.wait();
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const distributeMainBountyFn = async (signer, questionId, answerId) => {
  console.log(questionId, answerId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.distributeMainBounty(questionId, answerId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const collectBountyFn = async (signer, questionId) => {
  console.log(questionId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.collectBounty(questionId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const likeAnswerFn = async (signer, answerId) => {
  console.log(answerId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.likeAnswer(answerId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const dislikeAnswerFn = async (signer, answerId) => {
  // console.log(answerId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.dislikeAnswer(answerId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const getQuestionFn = async (signer, questionId) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // Call a function of your contract
    const res = await contract.getQuestion(questionId);
    console.log(res);
    return {
      _mainBounty: Number(res.mainBounty),
      _bountyPool: Number(res.bountyPool),
      bountyWinner: res.bountyWinner,
    };
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getCurrentBountyFn = async (signer, questionId) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // Call a function of your contract
    const res = await contract.getCurrentBountyPool(questionId);
    console.log(res);
    return {
      _mainBounty: Number(res.mainBounty),
      _bountyPool: Number(res.bountyPool),
    };
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getAnswerFn = async (signer, answerId) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // Call a function of your contract
    const res = await contract.getAnswer(answerId);
    console.log(res);
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
