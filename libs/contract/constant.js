export const CONTRACT_ADDRESS = "0xB821e7dDFD524FED8019038CbA6CB35a81a3392E";
export const CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "AlreadyInteracted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "AnswerNotFound",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BountyAlreadyDistributed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BountyNotEnabled",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BountyTimeNotElapsed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NoBountyToCollect",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotQuestionOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OnlyQuestionOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UserAlreadyExists",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UserNotFound",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EtherReceived",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			}
		],
		"name": "collectBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_answerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			}
		],
		"name": "createAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_bountyBased",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_mainBounty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bountyPool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_timeOfBounty",
				"type": "uint256"
			}
		],
		"name": "createQuestion",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_answerId",
				"type": "uint256"
			}
		],
		"name": "dislikeAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_answerId",
				"type": "uint256"
			}
		],
		"name": "distributeMainBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_answerId",
				"type": "uint256"
			}
		],
		"name": "likeAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			}
		],
		"name": "refundMainBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "answers",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "like",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dislike",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "dislikedBy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_answerId",
				"type": "uint256"
			}
		],
		"name": "getAnswer",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "answerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "like",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dislike",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			}
		],
		"name": "getCurrentBountyPool",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionId",
				"type": "uint256"
			}
		],
		"name": "getQuestion",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bountyBased",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "mainBounty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bountyPool",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bountyWinner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timeOfBounty",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bountyClaimed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hasInteracted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "likedBy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "questions",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeOfCreation",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bountyBased",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "mainBounty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bountyPool",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bountyWinner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timeOfBounty",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bountyClaimed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]