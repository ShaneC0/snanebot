import React, {useState} from "react";
import ReactDOM from "react-dom";
import {spawn} from "child_process";



export default function App() {
	const [channel, setChannel] = useState("");
	const [server, setServer] = useState("");
	const [running, setRunning] = useState(false);
	const [serverSelected, setServerSelected] = useState(false);
	const [channelSelected, setChannelSelected] = useState(false);

	const executeScript = async (e) => {
		e.preventDefault();


		const bin = await spawn('node', ['scripts/scrape.js', server, channel]);

		bin.stdout.on('data', (data) => {
			console.log(data);
		});

		bin.stderr.on('data', (data) => {
			console.log(`Error: ${data}`);
		});

		bin.on('close', (code) => {
			console.log(`Process exited with code ${code}`);
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
		</div>
	)
}



