import React, {useState} from "react";
import reactdom from "react-dom";
import {spawn} from "child_process";


export default function App() {

	const [formObject, setFormObject] = useState({
		email: "",
		password: "",
		message: "",
		server: "",
		channel: ""
	});

	const submit = async (e) => {
		e.preventDefault();

		const bin = await spawn('node', ['scripts/post.js', formObject.message, formObject.server, formObject.channel]);

		bin.stdout.on('data', (data) => {
			let dataStr = `${data}`
			console.log(dataStr)
		});

		bin.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});

		bin.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
	}

	return  (
		<div id="app">
		<form>
		<h1>snanebot</h1>
		<input type="text" placeholder="email" onChange={e =>  setFormObject({ ...formObject, email: e.target.value })}/>
		<input type="password" placeholder="password" onChange={e =>  setFormObject({ ...formObject, password: e.target.value })}/>
		<input type="text" placeholder="message" onChange={e =>  setFormObject({ ...formObject, message: e.target.value })}/>
		<input type="text" placeholder="server" onChange={e =>  setFormObject({ ...formObject, server: e.target.value })}/>
		<input type="text" placeholder="channel" onChange={e =>  setFormObject({ ...formObject, channel: e.target.value })}/>
		<button onClick={e => submit(e)}>Run</button>
		</form>
		</div>
	)

}



