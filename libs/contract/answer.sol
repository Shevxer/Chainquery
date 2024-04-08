// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Answer is ERC721Holder {
    uint256 private answerTableId;
    string private constant _ANSWER_TABLE_PREFIX = "answer_table";

    constructor() {
        // Create AnswerTable
        answerTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "answer_Id integer primary key unique not null,"
                "question_Id integer not null,"
                "address text not null,"
                "answer text not null,"
                "time_of_creation text,"
                "upvote integer,"
                "downvote integer",
                _ANSWER_TABLE_PREFIX
            )
        );
    }

    function getAnswerTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_ANSWER_TABLE_PREFIX, answerTableId);
    }

    function createAnswer(
        uint256 answerId,
        uint256 questionId,
        string memory addr,
        string memory answerText,
        string memory timeOfCreation,
        uint256 upvote,
        uint256 downvote
    ) external {
        string memory insertQuery = SQLHelpers.toInsert(
            _ANSWER_TABLE_PREFIX,
            answerTableId,
            "answer_Id, question_Id, address, answer, time_of_creation, upvote, downvote",
            string.concat(
                Strings.toString(answerId),
                ",",
                Strings.toString(questionId),
                ",",
                SQLHelpers.quote(addr),
                ",",
                SQLHelpers.quote(answerText),
                ",",
                SQLHelpers.quote(timeOfCreation),
                ",",
                Strings.toString(upvote),
                ",",
                Strings.toString(downvote)
            )
        );

        TablelandDeployments.get().mutate(
            address(this),
            answerTableId,
            insertQuery
        );
    }

    function updateAnswer(
        uint256 answerId,
        uint256 questionId,
        string memory addr,
        string memory answerText,
        string memory timeOfCreation,
        uint256 upvote,
        uint256 downvote
    ) external {
        string memory setters = string.concat(
            "address=",
            SQLHelpers.quote(addr),
            ",",
            "answer=",
            SQLHelpers.quote(answerText),
            ",",
            "time_of_creation=",
            SQLHelpers.quote(timeOfCreation),
            ",",
            "upvote=",
            Strings.toString(upvote),
            ",",
            "downvote=",
            Strings.toString(downvote)
        );

        string memory filters = string.concat("answer_Id=", Strings.toString(answerId), " AND question_Id=", Strings.toString(questionId));

        TablelandDeployments.get().mutate(
            address(this),
            answerTableId,
            SQLHelpers.toUpdate(
                _ANSWER_TABLE_PREFIX,
                answerTableId,
                setters,
                filters
            )
        );
    }

    function deleteAnswer(uint256 answerId, uint256 questionId) external {
        string memory filters = string.concat("answer_Id=", Strings.toString(answerId), " AND question_Id=", Strings.toString(questionId));

        TablelandDeployments.get().mutate(
            address(this),
            answerTableId,
            SQLHelpers.toDelete(_ANSWER_TABLE_PREFIX, answerTableId, filters)
        );
    }

    function updateVote(uint256 answerId, uint256 newUpvote, uint256 newDownvote) external {
        string memory setters = string.concat(
            "upvote=",
            Strings.toString(newUpvote),
            ",",
            "downvote=",
            Strings.toString(newDownvote)
        );

        string memory filters = string.concat("answer_Id=", Strings.toString(answerId));

        TablelandDeployments.get().mutate(
            address(this),
            answerTableId,
            SQLHelpers.toUpdate(
                _ANSWER_TABLE_PREFIX,
                answerTableId,
                setters,
                filters
            )
        );
    }


}