import web3 from "./web3";

const address = "0x005F795cD1D8e0070706EAACb119994c05726B98";
const abi = [
	{
		constant: true,
		inputs: [],
		name: 'manager',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0x481c6a75'
	},
	{
		constant: false,
		inputs: [],
		name: 'pickWinner',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x5d495aea'
	},
	{
		constant: true,
		inputs: [],
		name: 'getPlayers',
		outputs: [{ name: '', type: 'address[]' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0x8b5b9ccc'
	},
	{
		constant: false,
		inputs: [],
		name: 'enter',
		outputs: [],
		payable: true,
		stateMutability: 'payable',
		type: 'function',
		signature: '0xe97dcb62'
	},
	{
		constant: true,
		inputs: [{ name: '', type: 'uint256' }],
		name: 'players',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0xf71d96cb'
	},
	{
		constant: true,
		inputs: [],
		name: 'lastWinner',
		outputs: [{ name: '', type: 'address' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
		signature: '0xfe188184'
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor',
		constant: undefined,
		signature: 'constructor'
	}
];

export default new web3.eth.Contract(abi, address);
