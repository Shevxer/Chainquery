// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QueriFi {
    struct Question {
        address user;
        uint id;
        uint timeOfCreation;
        bool bountyBased;
        uint mainBounty;
        uint bountyPool;
        address bountyWinner;
        uint timeOfBounty;
        bool bountyClaimed;
        uint[] answerIds;
    }

    struct Answer {
        address user;
        uint questionId;
        uint answerId;
        uint like;
        uint dislike;
    }

    mapping(address => string) public users;
    mapping(uint => Question) public questions;
    mapping(uint => Answer) public answers;
    mapping(uint => mapping(address => bool)) public likedBy;
    mapping(uint => mapping(address => bool)) public dislikedBy;
    mapping(address => mapping(uint => bool)) public hasInteracted;

    error OnlyQuestionOwner();
    error UserAlreadyExists();
    error UserNotFound();
    error NotQuestionOwner();
    error NoBountyToCollect();
    error BountyTimeNotElapsed();
    error BountyNotEnabled();
    error BountyAlreadyDistributed();
    error AnswerNotFound();
    error AlreadyInteracted();

    modifier onlyQuestionOwner(uint _questionId) {
        require(msg.sender == questions[_questionId].user, "Only question owner allowed");
        _;
    }

    function createUser(string memory _name) external {
        require(bytes(users[msg.sender]).length == 0, "User already exists");
        users[msg.sender] = _name;
    }

    function getUser(address _userAddress) external view returns (string memory) {
        string memory name = users[_userAddress];
        return bytes(name).length > 0 ? name : "User Not Found";
    }

    function setUser(string memory _name) external {
        require(bytes(users[msg.sender]).length > 0, "User not found");
        users[msg.sender] = _name;
    }

    function createQuestion(
        uint _questionId,
        bool _bountyBased,
        uint _mainBounty,
        uint _bountyPool,
        uint _timeOfBounty
    ) external payable {
        require(_mainBounty > 0, "Main bounty must be greater than zero");
        require(_bountyPool > 0, "Bounty pool must be greater than zero");
        require(msg.value > 0, "Ether value must be greater than zero");

        uint[] memory answerIds = new uint[](0);
        questions[_questionId] = Question(
            msg.sender,
            _questionId,
            block.timestamp,
            _bountyBased,
            _mainBounty,
            _bountyPool,
            address(0),
            _timeOfBounty,
            false,
            answerIds
        );

        emit EtherReceived(msg.sender, msg.value);
    }

    event EtherReceived(address sender, uint amount);

    function createAnswer(uint _answerId, uint _questionId) external {
        require(questions[_questionId].id > 0, "Question does not exist");
        answers[_answerId] = Answer(msg.sender, _questionId, _answerId, 0, 0);
        questions[_questionId].answerIds.push(_answerId); 
    }


    function likeAnswer(uint _answerId) external {
        uint _questionId = answers[_answerId].questionId;
        require(_answerId > 0 && _questionId > 0 && questions[_questionId].id > 0, "Answer not found");
        require(!hasInteracted[msg.sender][_answerId], "Already interacted");

        answers[_answerId].like++;
        likedBy[_answerId][msg.sender] = true;
        hasInteracted[msg.sender][_answerId] = true;
    }

    function dislikeAnswer(uint _answerId) external {
        uint _questionId = answers[_answerId].questionId;
        require(_answerId > 0 && _questionId > 0 && questions[_questionId].id > 0, "Answer not found");
        require(!hasInteracted[msg.sender][_answerId], "Already interacted");

        answers[_answerId].dislike++;
        dislikedBy[_answerId][msg.sender] = true;
        hasInteracted[msg.sender][_answerId] = true;
    }

    function collectBounty(uint _questionId) external {
        require(_questionId > 0, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.bountyPool > 0, "No bounty available to collect");
        require(block.timestamp >= question.timeOfBounty, "Bounty time not elapsed");
        require(!question.bountyClaimed, "Bounty already claimed");

        question.bountyClaimed = true;
        distributeBountyPool(_questionId);
    }

    function distributeBountyPool(uint _questionId) internal {
        Question storage question = questions[_questionId];
        uint totalLikes;
        uint totalDislikes;

        for (uint i = 0; i < question.answerIds.length; i++) {
            uint answerId = question.answerIds[i];
            totalLikes += answers[answerId].like;
            totalDislikes += answers[answerId].dislike;
        }

        for (uint j = 0; j < question.answerIds.length; j++) {
            uint answerId = question.answerIds[j];
            uint answerScore = answers[answerId].like - answers[answerId].dislike;
            uint answerShare;
            if (totalLikes + totalDislikes == 0) {
                answerShare = 0;
            } else {
                answerShare = (answerScore * question.bountyPool) / (totalLikes + totalDislikes);
            }
            payable(answers[answerId].user).transfer(answerShare);
        }
    }

    function getCurrentBountyPool(uint _questionId) external view returns (uint[] memory, address[] memory, uint[] memory) {
        Question storage question = questions[_questionId];
        uint[] memory answerIds = question.answerIds;
        address[] memory answerUsers = new address[](answerIds.length);
        uint[] memory answerShares = new uint[](answerIds.length);

        uint totalScore = 0;
        for (uint i = 0; i < answerIds.length; i++) {
            uint answerId = answerIds[i];
            totalScore += answers[answerId].like - answers[answerId].dislike;
        }

        for (uint i = 0; i < answerIds.length; i++) {
            uint answerId = answerIds[i];
            answerUsers[i] = answers[answerId].user;
            uint answerScore = answers[answerId].like - answers[answerId].dislike;
            uint answerShare;
            if (totalScore == 0) {
                answerShare = 0;
            } else {
                answerShare = (answerScore * question.bountyPool) / totalScore;
            }
            answerShares[i] = answerShare;
        }

        return (answerIds, answerUsers, answerShares);
    }

    function distributeMainBounty(uint _questionId, uint _answerId) external onlyQuestionOwner(_questionId) {
        require(_questionId > 0, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.mainBounty > 0, "Main bounty is not set");
        require(question.bountyWinner == address(0), "Bounty has already been distributed for this question");
        require(_answerId > 0, "Invalid answer ID");
        require(answers[_answerId].questionId == _questionId, "Answer does not belong to this question");

        question.bountyWinner = answers[_answerId].user;
        payable(question.bountyWinner).transfer(question.mainBounty);
        question.mainBounty = 0;
    }

    function refundMainBounty(uint _questionId) external onlyQuestionOwner(_questionId) {
        require(_questionId > 0, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.mainBounty > 0, "Main bounty is not set");
        require(question.bountyWinner == address(0), "Bounty has already been distributed for this question");

        payable(question.user).transfer(question.mainBounty);
        question.mainBounty = 0;
    }

    function getQuestion(uint _questionId) external view returns (
        address user,
        uint id,
        uint timeOfCreation,
        bool bountyBased,
        uint mainBounty,
        uint bountyPool,
        address bountyWinner,
        uint timeOfBounty,
        bool bountyClaimed
    ) {
        Question storage question = questions[_questionId];
        return (
            question.user,
            question.id,
            question.timeOfCreation,
            question.bountyBased,
            question.mainBounty,
            question.bountyPool,
            question.bountyWinner,
            question.timeOfBounty,
            question.bountyClaimed
        );
    }

    function getAnswer(uint _answerId) external view returns (
        address user,
        uint questionId,
        uint answerId,
        uint like,
        uint dislike
    ) {
        require(_answerId > 0, "Invalid answer ID");
        Answer memory answer = answers[_answerId];
        return (
            answer.user,
            answer.questionId,
            answer.answerId,
            answer.like,
            answer.dislike
        );
    }
}