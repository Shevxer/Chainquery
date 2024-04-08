// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Question is ERC721Holder {
    uint256 private questionTableId;
    string private constant _QUESTION_TABLE_PREFIX = "question_table";

    constructor() {
        // Create QuestionTable
        questionTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "question_id integer primary key unique not null,"
                "address text not null,"
                "question text not null,"
                "details text,"
                "tags text,"
                "time_of_creation text not null,"
                "time_based integer,"
                "time_alloted text,"
                "upvote integer,"
                "downvote integer",
                _QUESTION_TABLE_PREFIX
            )
        );
    }

    function getQuestionTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_QUESTION_TABLE_PREFIX, questionTableId);
    }

    function createQuestion(
        uint256 questionId,
        string memory addr,
        string memory questionText,
        string memory details,
        string memory tags,
        string memory timeOfCreation,
        uint256 timeBased,
        string memory timeAlloted,
        uint256 upvote,
        uint256 downvote
    ) external {
        string memory insertQuery = SQLHelpers.toInsert(
            _QUESTION_TABLE_PREFIX,
            questionTableId,
            "question_id, address, question, details, tags, time_of_creation, time_based, time_alloted, upvote, downvote",
            string.concat(
                Strings.toString(questionId),
                ",",
                SQLHelpers.quote(addr),
                ",",
                SQLHelpers.quote(questionText),
                ",",
                SQLHelpers.quote(details),
                ",",
                SQLHelpers.quote(tags),
                ",",
                SQLHelpers.quote(timeOfCreation),
                ",",
                Strings.toString(timeBased),
                ",",
                SQLHelpers.quote(timeAlloted),
                ",",
                Strings.toString(upvote),
                ",",
                Strings.toString(downvote)
            )
        );

        TablelandDeployments.get().mutate(
            address(this),
            questionTableId,
            insertQuery
        );
    }

    function updateQuestion(
        uint256 questionId,
        string memory addr,
        string memory questionText,
        string memory details,
        string memory tags,
        string memory timeOfCreation,
        uint256 timeBased,
        string memory timeAlloted,
        uint256 upvote,
        uint256 downvote
    ) external {
        string memory setters = string.concat(
            "address=",
            SQLHelpers.quote(addr),
            ",",
            "question=",
            SQLHelpers.quote(questionText),
            ",",
            "details=",
            SQLHelpers.quote(details),
            ",",
            "tags=",
            SQLHelpers.quote(tags),
            ",",
            "time_of_creation=",
            SQLHelpers.quote(timeOfCreation),
            ",",
            "time_based=",
            Strings.toString(timeBased),
            ",",
            "time_alloted=",
            SQLHelpers.quote(timeAlloted),
            ",",
            "upvote=",
            Strings.toString(upvote),
            ",",
            "downvote=",
            Strings.toString(downvote)
        );

        string memory filters = string.concat("question_id=", Strings.toString(questionId));

        TablelandDeployments.get().mutate(
            address(this),
            questionTableId,
            SQLHelpers.toUpdate(
                _QUESTION_TABLE_PREFIX,
                questionTableId,
                setters,
                filters
            )
        );
    }

    function deleteQuestion(uint256 questionId) external {
        string memory filters = string.concat("question_id=", Strings.toString(questionId));

        TablelandDeployments.get().mutate(
            address(this),
            questionTableId,
            SQLHelpers.toDelete(_QUESTION_TABLE_PREFIX, questionTableId, filters)
        );
    }
}