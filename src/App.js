import React, {useState} from "react";
import ReactDOM from "react-dom";
import {spawn} from "child_process";



export default function App() {
	const [statusLine, setStatusLine] = useState("");
	const [info, setInfo] = useState({
		scrapingServer: "",
		scrapingChannel: "",
		sendingServer: "",
		sendingChannel: ""
	});


	const executeScript = async (e) => {
		e.preventDefault();

		console.log(info);

		const bin = await spawn('node', ['scripts/scrape.js', info.scrapingServer, info.scrapingChannel, info.sendingServer, info.sendingChannel]);

		bin.stdout.on('data', (data) => {
			setStatusLine(`${data}`);
		});

		bin.stderr.on('data', data => {
			console.log(`Error: ${data}`);
		});
	}

	return (
		<div id="app">
		<form>
		<h1>snanebot</h1>

		<p>{statusLine}</p>

		<input type="text" name="scrapingServer" placeholder="Server to scrape" onChange={e => setInfo({...info, scrapingServer: e.target.value})}/>
		<input type="text" name="scrapingChannel" placeholder="Channel to scrape" onChange={e => setInfo({...info, scrapingChannel: e.target.value})}/>
		<input type="text" name="sendingServer" placeholder="Server to send to" onChange={e => setInfo({...info, sendingServer: e.target.value})}/>
		<input type="text" name="sendingChannel" placeholder="Channel to send to" onChange={e => setInfo({...info, sendingChannel: e.target.value})}/>

		<button onClick={e => executeScript(e)}>Run</button>
		</form>
		</div>
	)
}



