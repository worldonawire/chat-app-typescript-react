import React from "react";
import { useChannelDispatch } from "../../contexts/ChannelContext";
import { Col, ChannelContainer, ChooseChannel } from "./styles";
import User from "../User";

const Navbar = () => {
	const dispatch = useChannelDispatch();

	const changeChannel = (e: any) => {
		let channelID = e.currentTarget.dataset.id;
		let name = e.currentTarget.innerText;
		let targetChannel = {
			channelID,
			name,
			timeAtClick: Date.now(),
		};
		dispatch({ type: "CHANNEL", payload: targetChannel });
	};

	return (
		<Col size={1} color="#F4F5FB" height="100vh">
			<br></br>
			<User />
			<br></br>
			<ChannelContainer>
				<p>2. Choose your Channel</p>
				<ChooseChannel>
					<li data-id="1" onClick={changeChannel}>
						<p>
							<span>General Channel</span>
						</p>
					</li>
					<li data-id="2" onClick={changeChannel}>
						<p>
							<span>Technology Channel</span>
						</p>
					</li>
					<li data-id="3" onClick={changeChannel}>
						<p>
							<span>LGTM Channel</span>
						</p>
					</li>
				</ChooseChannel>
			</ChannelContainer>
		</Col>
	);
};

export default Navbar;
