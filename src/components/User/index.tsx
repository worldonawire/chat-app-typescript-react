import React from "react";
import { useUserDispatch } from "../../contexts/UserContext";
import { Select } from "./styles";

export default function User() {
	const dispatch = useUserDispatch();
	return (
		<div>
			<label>1. Choose you User</label>
			<br></br>
			<br></br>
			<Select
				onChange={(e) => dispatch({ type: "USER", payload: e.target.value })}
			>
				<option value="Sam">Sam</option>
				<option value="Russell">Russell</option>
				<option value="Joyse">Joyse</option>
			</Select>
		</div>
	);
}