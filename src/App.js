import React, {useState} from "react";
import ReactDOM from "react-dom";
import {spawn} from "child_process";
import Form from './components/Form.js';
import Status from './components/Status.js';



export default function App() {
	const [statusLine, setStatusLine] = useState("");
	const [isRunning, setIsRunning] = useState(false);
	const [sentMessages, setSentMessages] = useState([]);
	const [info, setInfo] = useState({
		scrapingServer: "",
		scrapingChannel: "",
		sendingServer: "",
		sendingChannel: ""
	});

	let handleChange = (e, target) => {
		setInfo({...info, [target]: e.target.value});
	}


	let submit = (e) => {
		e.preventDefault();

		setIsRunning(true);

		const bin = spawn('node', ['scripts/scrape.js', info.scrapingServer, info.scrapingChannel, info.sendingServer, info.sendingChannel]);

		bin.stdout.on('data', (data) => {
			if(data.includes('Sending')) {
				let broken = data.toString().trim().split("Sending:");
				setSentMessages(oldMessages => [broken[1], ...oldMessages]);
			} else {
				setStatusLine(`${data}`);
			};
		});

		bin.stderr.on('data', data => {
			console.log(`Error: ${data}`);
		});
	}

	let currentPage = isRunning ? <Status statusObject={info} sentMessages={sentMessages}/> : <Form handleChange={handleChange} submit={submit} />;

	return (
		<div id="app">
			<h1>Snanebot</h1>
			{isRunning ? <h3 style={{'color': 'lightgreen'}}>{statusLine}</h3> : null}
			{currentPage}
			{isRunning ? <div id="messagePane">Sent Messages: {sentMessages.map((message, idx) => <p key={idx}>{message}</p>)}</div> : null}
		</div>
	)
}



