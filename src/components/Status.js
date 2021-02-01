import React from "react";

export default function Status({statusObject}) {
	return (
		<div id="statusPage">
			<div className="statusServer">
				<h2>{statusObject.scrapingChannel}</h2>
				<h2>{statusObject.scrapingServer}</h2>
			</div>
			<h1>→</h1>
			<div className="statusServer">
				<h2>{statusObject.sendingChannel}</h2>
				<h2>{statusObject.sendingServer}</h2>
			</div>
		</div>
	);
}
