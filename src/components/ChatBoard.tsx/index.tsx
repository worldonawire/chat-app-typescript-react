import React, { MouseEvent, useState, useEffect, useRef } from "react";
import {
    OuterContainer,
    ChatRow,
    ChatContainer,
    ChatElement,
    ChatText,
    PersonIcon,
    ImageContainer,
    FetchButton,
    Information,
} from "./styles";

import PostMessage from "../PostMessage";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useChannelState } from "../../contexts/ChannelContext";
import {
    FaArrowDown,
    FaArrowUp,
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";
import { Col } from "../../App.styles";
import { useErrorDispatch, useErrorState } from "../../contexts/ErrorContext";
import { useSentState } from "../../contexts/SentContext";

const LATEST_MESSAGES = gql`
	query fetchLatestMessages($channelId: String!) {
		fetchLatestMessages(channelId: $channelId) {
			messageId
			text
			datetime
			userId
		}
	}
`;

const FETCH_MORE_MESSAGES = gql`
	query fetchMoreMessages(
		$channelId: String!
		$messageId: String!
		$old: Boolean!
	) {
		fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
			messageId
			text
			datetime
			userId
		}
	}
`;

interface MessageObject {
    messageId: string;
    text: string;
    datetime?: string;
    userId: string;
}

interface ErrorMessageObject {
    messageId: string | undefined;
    text: string | undefined;
    userId: string | undefined;
    timeAtError?: string | undefined;
}

export default function ChatBoard() {
    let channelState = useChannelState();
    let errorState = useErrorState();
    let errorDispatch = useErrorDispatch();
    let sentState = useSentState()

    const [state, setState] = useState<MessageObject[] | ErrorMessageObject[]>(
        []
    );
    // let errorChat = useRef<string | boolean>(false);
    useEffect(() => {
        if (errorState.errMessage.timeAtError !== undefined) {
            // errorChat.current = "something";
            // errorDispatch({
            //             type: "ERROR_MESSAGE",
            //             payload: {
            //                 ...errorState.errMessage,
            //                 messageId: "",
            //                 text: "",
            //                 userId: "",
            //                 timeAtError: undefined,
            //             },
            //         });
            setState([errorState.errMessage, ...state]);
            // return function cleanUp() {
            //     errorDispatch({
            //         type: "ERROR_MESSAGE",
            //         payload: {
            //             ...errorState.errMessage,
            //             messageId: "",
            //             text: "",
            //             userId: "",
            //             timeAtError: undefined,
            //         },
            //     });
            // };
        }
    }, [errorState]);

    const persistBool = useRef<string | boolean>("This should be a bool");

    /* -------------------Fetch initial messages--------------------- */
    const { loading, data, error, refetch } = useQuery(LATEST_MESSAGES, {
        variables: { channelId: channelState.channel.channelID },
        
        errorPolicy: "all",
    });
    let emptyChat = useRef(true)
    // let emptyChat: boolean = false;
    let stateLoading: boolean = false;

    let timeAtRender = useRef(Date.now())
    let firstAndLast = useRef<MessageObject[]>([]);
    useEffect(() => {
        if (data) {
            refetch()
            firstAndLast.current[0] = data.fetchLatestMessages[0];
            firstAndLast.current[1] = data.fetchLatestMessages[data.fetchLatestMessages.length-1];
            setState(data.fetchLatestMessages)    
        } 
    }, [channelState.channel.timeAtClick]);

  
    useEffect(() => {
        if (!data || loading) {
            stateLoading = true;
        } else if (data.fetchLatestMessages.length === 0) {
            emptyChat.current = true;
            setState([])
        } else if (data.fetchLatestMessages.length > 0) {
            firstAndLast.current[0] = data.fetchLatestMessages[0];
            firstAndLast.current[1] = data.fetchLatestMessages[data.fetchLatestMessages.length-1];
            emptyChat.current = false;
            setState(data.fetchLatestMessages);
        }
        console.log("Messages: ", state);
    }, [data]);

    let errorMessage: string | undefined;
    if (
        error?.networkError &&
        typeof window !== "undefined" &&
        !window.navigator.onLine
    ) {
        errorMessage = "Sorry your browser is offline.";
    } else if (error?.graphQLErrors) {
        errorMessage = error?.message;
    }

    /* -------------------Fetch more messages--------------------- */
    const [
        fetchMoreMessages,
        { loading: fetchMoreLoading, data: fetchMoreData, error: fetchMoreErrors },
    ] = useLazyQuery(FETCH_MORE_MESSAGES, { fetchPolicy: "network-only" });

    // let bool: boolean | undefined;

    let newLoading: boolean = false;
    let noMoreMessages = useRef(false)
    // let noMoreMessages: boolean = false;
    useEffect(() => {
        if (!fetchMoreData || fetchMoreLoading) {
            newLoading = true;
        } else if (fetchMoreData && fetchMoreData.fetchMoreMessages.length === 0) {
            noMoreMessages.current = true;
        } else if (
            fetchMoreData.fetchMoreMessages.length > 0 &&
            persistBool.current === "true"
        ) {
            firstAndLast.current[0] = fetchMoreData.fetchMoreMessages[0];
            firstAndLast.current[1] = fetchMoreData.fetchMoreMessages[fetchMoreData.fetchMoreMessages.length-1];
            // noMoreMessages.current = false;
            setState([...state, ...fetchMoreData.fetchMoreMessages]);
        } else if (
            fetchMoreData.fetchMoreMessages.length > 0 &&
            persistBool.current === "false"
        ) {
            firstAndLast.current[0] = fetchMoreData.fetchMoreMessages[0];
            firstAndLast.current[1] = fetchMoreData.fetchMoreMessages[fetchMoreData.fetchMoreMessages.length-1];
            // noMoreMessages.current = true;
            var reversedArray = [...fetchMoreData.fetchMoreMessages].reverse();
            setState([...reversedArray, ...state]);
        }
    }, [fetchMoreData]);

    const fetchHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let mssgId;
        let bool;
        persistBool.current = e.currentTarget.value;
        if (e.currentTarget.value === "true" ) {
			bool = true;
			mssgId = firstAndLast.current[1].messageId;
		} else {
			bool = false;
			mssgId = firstAndLast.current[0].messageId;
		}
     
        fetchMoreMessages({
            variables: {
                channelId: channelState.channel.channelID,
                messageId: mssgId,
                old: bool,
            },
        });
        console.log("bool: ", bool);
        console.log("After fetchMore messages lazy request");
    };

    return (
        <Col
            size={3}
            color="#F4F5FB"
            direction="column"
            height="100vh"
            paddingLeft="1em"
            paddingRight="1em"
            paddingBottom="1em"
        >
            <OuterContainer>
                <h1
                    style={{
                        color: "#495057",
                        borderBottom: "1px solid #e6ecf3",
                        marginBottom: "0.5em",
                        padding: "0.5em 0",
                    }}
                >
                    {channelState.channel.name}
                </h1>
               
                    <FetchButton value="true" onClick={fetchHandler}>
                        Read More
                        <FaArrowUp />
                    </FetchButton>
               
                <ChatRow>
                    {loading || fetchMoreLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>There was an error loading the page</p>
                    ) : null}
                    {emptyChat.current ? (
                        <p>This chat is empty, please send a message!</p>
                    ) : state ? (
                        state.map((user: any) => (
                            <div key={user.messageId}>
                                <ChatContainer
                                    userId={user.userId}
                                    latestUser={state[0].userId}
                                >
                                    <ChatElement
                                        userId={user.userId}
                                        latestUser={state[0].userId}
                                    >
                                        <ImageContainer>
                                            <PersonIcon userId={user.userId} />
                                            <p
                                                style={{
                                                    marginTop: "-1em",
                                                    padding: "0px",
                                                    verticalAlign: "top",
                                                }}
                                            >
                                                {user.userId}
                                            </p>
                                        </ImageContainer>
                                        <ChatText>
                                            <span style={{ position: "relative", top: "-1em" }}>
                                                {user.text}
                                            </span>
                                        </ChatText>
                                        {user.userId === state[0].userId ? (
                                            <div
                                                style={{
                                                    flex: "display",
                                                    flexDirection: "row-reverse",
                                                }}
                                            >
                                                <Information
                                                    userId={user.userId}
                                                    latestUser={state[0].userId}
                                                >
                                                    <p style={{ margin: "0 0.25em" }}>
                                                        {user.datetime
                                                            ? user.datetime.substr(11, 5)
                                                            : user.timeAtError.substr(11, 5)}
                                                    </p>
                                                    {user.datetime ? (
                                                        <FaCheckCircle style={{ color: "#9EC94A" }} />
                                                    ) : (
                                                        <FaExclamationCircle style={{ color: "#B71E3C" }} />
                                                    )}
                                                    {user.datetime ? (
                                                        <span style={{ margin: "0 0.25em" }}>sent</span>
                                                    ) : (
                                                        <span style={{ margin: "0 0.25em" }}>unsent</span>
                                                    )}
                                                </Information>
                                            </div>
                                        ) : (
                                            <p style={{ margin: "0 0.25em" }}>
                                                {user.datetime.substr(11, 5)}
                                            </p>
                                        )}
                                    </ChatElement>
                                </ChatContainer>
                            </div>
                        ))
                    ) : null}
                </ChatRow>
                {/* {errorChat ? <div>Hey</div> : null} */}
               
                    <FetchButton value="false" onClick={fetchHandler}>
                        Read More
                        <FaArrowDown />
                    </FetchButton>
            
                <PostMessage />
            </OuterContainer>
        </Col>
    );
}


// !noMoreMessages.current ? (
//     <p>No further messages</p>
// ) : 