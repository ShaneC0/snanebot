import React, {useState} from "react";
import ReactDOM from "react-dom";
import {spawn} from "child_process";



export default function App() {
	const [channel, setChannel] = useState("");
	const [server, setServer] = useState("");
	const [statusLine, setStatusLine] = useState("");

	const executeScript = async (e) => {
		e.preventDefault();

		const bin = await spawn('node', ['scripts/scrape.js', server, channel]);

		bin.stdout.on('data', (data) => {
			setStatusLine(`${data}`);
		});
	}

	return (
		<div id="app">
		<h1>snanebot</h1>
		<form>
		<input type="text" name="server" placeholder="Server" onChange={e => setServer(e.target.value)}/>
		<input type="text" name="channel" placeholder="Channel" onChange={e => setChannel(e.target.value)}/>
		<button onClick={e => executeScript(e)}>Run</button>
		</form>
		<h1>{statusLine}</h1>
		</div>
	)
}



