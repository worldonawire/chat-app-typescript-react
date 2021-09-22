import React, { useState, ChangeEvent, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, SendButton, TextArea } from "./styles";

import { useErrorDispatch } from "../../contexts/ErrorContext";
import { FaPaperPlane } from "react-icons/fa";
import { useChannelState } from "../../contexts/ChannelContext";
import { useUserState } from "../../contexts/UserContext";
import { useTextDispatch, useTextState } from "../../contexts/TextContext";
import { useSentDispatch } from "../../contexts/SentContext";

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

type TextAction = {
    type: string;
    payload: string;
}
type TextDispatch = (action: TextAction) => void;

export default function PostMessage(): JSX.Element {
	let errorDispatch = useErrorDispatch();
	let userState = useUserState();
	let channelState = useChannelState();
    let textState = useTextState();
	let dispatch: TextDispatch = useTextDispatch();
	let sentDispatch = useSentDispatch()
	const [message, setMessage] = useState<PostMessageObject>(
		{} as PostMessageObject
	);

	console.log("Message: ", message);
	const [postMessage, { error }] = useMutation(POST_MESSAGE);
	console.log("First error check: ", { error });
    // let textValue: string = "";
    useEffect(() => {
        // if (textState) {
        //     textValue = textState.text;
        // }

		setMessage({
			...message,
			channelId: channelState.channel.channelID,
			text: textState.text,
			userId: userState.user,
		});
    }, [userState, channelState]);
    
    // useEffect(() => {
    //     if (message.text) {
    //         dispatch({type: "TEXT", payload: message.text})
    //     }
    // }, [message])

	let errorMessage: string | undefined;
	if (
		error?.networkError &&
		typeof window !== "undefined" &&
		!window.navigator.onLine
	) {
		errorMessage = "Sorry your browser is offline.";
	} else if (error?.networkError) {
		console.log("Network error I think: ", error);
		// localStorage.setItem("unsentMessage", JSON.stringify(message));
		errorMessage = error?.message;
		// console.log("unsent message: ", localStorage.getItem("unsentMessage"));
	} else if (error?.graphQLErrors) {
		console.log("error: ", error);
		console.log("errorMessage: ", error.message);
	}

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: "TEXT", payload: "" });
		e.currentTarget.reset();
		postMessage({ variables: message })
			.then((result) => {
				sentDispatch({ type: "SENT_MESSAGE", payload: true})
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
    // e: ChangeEvent<HTMLTextAreaElement>
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, dispatch: TextDispatch) => {
        let text = e.target.value;
        dispatch({ type: "TEXT", payload: text })
		setMessage({ ...message, text: e.target.value });
	};

	return (
		<Form height="30vh" direction="column">
			<form onSubmit={handleSubmit}>
				<label>
					<TextArea
						name="mssg"
						placeholder="Type your message here..."
                        onChange={e => handleChange(e, dispatch)}
                        // value={textValue}
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


