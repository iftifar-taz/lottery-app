import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery-contract";

class App extends Component {
	state = {
		manager: "",
		lastWinner: "",
		players: [],
		balance: "",
		value: "",
		message: ""
	};

	setValueState = value => {
		this.setState({ value: value });
	};

	onSubmit = async event => {
		event.preventDefault();
		const accounts = await web3.eth.getAccounts();

		this.setState({
			message: "Waiting on transaction success..."
		});

		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.value, "ether")
		});

		this.setState({
			players: await lottery.methods.getPlayers().call(),
			balance: await web3.eth.getBalance(lottery.options.address),
			message: "You have been entered!"
		});
	};

	onClick = async () => {
		const accounts = await web3.eth.getAccounts();

		this.setState({
			message: "Waiting on transaction success..."
		});

		await lottery.methods.pickWinner().send({
			from: accounts[0]
		});

		this.setState({
			lastWinner: await lottery.methods.lastWinner().call(),
			players: [],
			balance: "",
			message: "A winner has been picked!"
		});
	};

	componentDidMount = async () => {
		this.setState({
			manager: await lottery.methods.manager().call(),
			lastWinner: await lottery.methods.lastWinner().call(),
			players: await lottery.methods.getPlayers().call(),
			balance: await web3.eth.getBalance(lottery.options.address)
		});
	};

	render = () => {
		return (
			<div>
				<h2>Lottery Contract!!</h2>
				<p>This contract is managed by {this.state.manager}</p>
				<p>Last winner is {this.state.lastWinner}</p>
				<p>There are currently {this.state.players.length} people entered.</p>
				<p>Competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether!</p>
				<hr />
				<form onSubmit={this.onSubmit}>
					<h4>Want to try your luck?</h4>
					<div>
						<label>Amount of ether to enter: </label>
						<input
							value={this.state.value}
							onChange={event => this.setValueState(event.target.value)}
						/>
					</div>
					<button>Enter</button>
				</form>
				<hr />
				<h4>Ready to pick a winner?</h4>
				<button onClick={this.onClick}>Pick a winner!</button>
				<hr />
				<h1>{this.state.message}</h1>
			</div>
		);
	};
}

export default App;
