import React, {useState} from "react";
import ReactDOM from "react-dom";
import {spawn} from "child_process";



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


	const executeScript = async (e) => {
		e.preventDefault();

		setIsRunning(!isRunning);

		const bin = await spawn('node', ['scripts/scrape.js', info.scrapingServer, info.scrapingChannel, info.sendingServer, info.sendingChannel]);

		bin.stdout.on('data', (data) => {

			if(data.includes('Sending')) {
				let broken = data.toString().trim().split("Sending:");
				setSentMessages(oldMessages => [...oldMessages, broken[1]]);
				} else {

					setStatusLine(`${data}`);
					}

			});

		bin.stderr.on('data', data => {
			console.log(`Error: ${data}`);
			});
		}

	return (
		<div id="app">

		{isRunning ?

		<div id="statusPage">
			<div id="statusContainer">
				<div>
					<h1>Scraping from:</h1>
					<p>{info.scrapingChannel} in {info.scrapingServer}</p>
				</div>
				<div>
					<h1>Sending to:</h1>
					<p>{info.sendingChannel} in {info.sendingServer}</p>
				</div>

				<h1>Status:</h1>
				<h2 style={{'color': 'lightgreen'}}>{statusLine}</h2>

				<h1>Sent Messages:</h1>
				<div id="messagePane">
			{sentMessages.map(message => <p>{message}</p>)}
		</div>
	</div>
</div>

	:

	<div id="formPage">

		<form>

			<input type="text" name="scrapingServer" placeholder="Server to scrape" onChange={e => setInfo({...info, scrapingServer: e.target.value})}/>
			<input type="text" name="scrapingChannel" placeholder="Channel to scrape" onChange={e => setInfo({...info, scrapingChannel: e.target.value})}/>
			<input type="text" name="sendingServer" placeholder="Server to send to" onChange={e => setInfo({...info, sendingServer: e.target.value})}/>
			<input type="text" name="sendingChannel" placeholder="Channel to send to" onChange={e => setInfo({...info, sendingChannel: e.target.value})}/>

		</form>

		<button onClick={e => executeScript(e)}>Run</button>

	</div>
			}

		</div>
		)
}



