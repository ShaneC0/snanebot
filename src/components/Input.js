import React from "react";

export default function Input(props) {
	return (
		<div className="input-group">
			<label>{props.name}</label>
			<input onChange={e => props.handleChange(e, props.stateName)} type="text" />
		</div>
	);

}
