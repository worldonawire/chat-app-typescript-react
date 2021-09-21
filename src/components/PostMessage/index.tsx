import React, { useState, ChangeEvent, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, SendButton, TextArea } from "./styles";

// import { useUserState } from "../../contexts/UserContext";
// import { useChannelState } from "../../contexts/ChannelContext";
// import { useTextState } from "../../contexts/TextContext";
import { useErrorDispatch } from "../../contexts/ErrorContext";
import { FaPaperPlane } from "react-icons/fa";
import { useChannelState } from "../../contexts/ChannelContext";
import { useUserState } from "../../contexts/UserContext";

const POST_MESSAGE = gql`
	mutation postMessage($channelId: String!, $text: String!, $userId: String!) {
		postMessage(channelId: $channelId, text: $text, userId: $userId) {
			messageId
			text
			datetime
			userId
		}
	}
`;

interface PostMessageObject {
	channelId: string;
	text: string;
	userId: string;
	timeAtError?: string;
	messageId?: string;
}

export default function PostMessage(): JSX.Element {
	let errorDispatch = useErrorDispatch();
	let userState = useUserState();
	let channelState = useChannelState();
	// let textState = useTextState();
	const [message, setMessage] = useState<PostMessageObject>(
		{} as PostMessageObject
	);

	console.log("Message: ", message);
	const [postMessage, { error }] = useMutation(POST_MESSAGE);
	console.log("First error check: ", { error });

	useEffect(() => {
		setMessage({
			...message,
			channelId: channelState.channel.channelID,
			text: "",
			userId: userState.user,
		});
	}, [userState, channelState]);

	let errorMessage: string | undefined;
	if (
		error?.networkError &&
		typeof window !== "undefined" &&
		!window.navigator.onLine
	) {
		errorMessage = "Sorry your browser is offline.";
	} else if (error?.networkError) {
		console.log("Network error I think: ", error);
		localStorage.setItem("unsentMessage", JSON.stringify(message));
		errorMessage = error?.message;
		console.log("unsent message: ", localStorage.getItem("unsentMessage"));
	} else if (error?.graphQLErrors) {
		console.log("error: ", error);
		console.log("errorMessage: ", error.message);
	}

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Message is: ", message);
		e.currentTarget.reset();

		postMessage({ variables: message })
			.then((result) => {
				console.log("Message sent");
			})
			.catch((err) => {
				let errTime = new Date().toISOString();
				let messId = errTime.toString();
				errorDispatch({
					type: "ERROR_MESSAGE",
					payload: { ...message, messageId: messId, timeAtError: errTime },
				});
			});
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage({ ...message, text: e.target.value });
	};

	return (
		<Form height="30vh" direction="column">
			<form onSubmit={handleSubmit}>
				<label>
					<TextArea
						name="mssg"
						placeholder="Type your message here..."
						onChange={handleChange}
					/>
				</label>

				<SendButton type="submit">
					Send Message
					<FaPaperPlane />
				</SendButton>
			</form>
		</Form>
	);
}
