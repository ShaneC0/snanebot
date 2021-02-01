import React from "react";
import Input from './Input.js';

export default function Form({handleChange, submit}) {
	return (
		<form>
			<Input handleChange={handleChange} name="Scraping Server" stateName="scrapingServer"/>
			<Input handleChange={handleChange} name="Scraping Channel" stateName="scrapingChannel"/>
			<Input handleChange={handleChange} name="Sending Server" stateName="sendingServer"/>
			<Input handleChange={handleChange} name="Sending Channel" stateName="sendingChannel"/>
			<button type="submit" onClick={e => submit(e)}>Run</button>
		</form>
	)
}
