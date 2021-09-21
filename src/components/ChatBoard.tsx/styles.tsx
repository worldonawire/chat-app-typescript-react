import styled from "styled-components";
import PersonIconRussell from "../../assets/Russell.png";
import PersonIconSam from "../../assets/Sam.png";
import PersonIconJoyse from "../../assets/Joyse.png";

interface ChatContainerProps {
	latestUser?: string;
	userId?: string;
}

interface ChatElementProps {
	latestUser?: string;
	userId?: string;
}

interface ChatTextProps {
	latestUser?: string;
	userId?: string;
}

interface IconProps {
	userId: string;
}

interface InformationProps {
	latestUser?: string;
	userId?: string;
}

export const OuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: #f4f5fb;
	min-height: 64px;
	border-bottom: 1px solid #e6ecf3;
	line-height: 64px;
	border-radius: 0 3px 0 0;
`;

export const ChatContainer = styled.div<ChatContainerProps>`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) =>
		props.userId === props.latestUser ? "flex-end" : "flex-start"};
	align-content: center;
	align-items: center;
	background-color: #f4f5fb;
	padding-top: 1em;
	padding-bottom: 1em;
	height: 7em;
`;

export const ChatRow = styled.div`
	display: flex;
	flex-direction: column-reverse;
	width: 100%;
	height: 100%;
	background: #f4f5fb;
	color: #855d89;
`;

export const ChatElement = styled.div<ChatElementProps>`
	display: flex;
	flex-direction: ${(props) =>
		props.userId === props.latestUser ? "row-reverse" : "row"};
	color: #855d89;
	height: 5em;
	padding-left: 1em;
	padding-right: 1em;
`;

export const ChatText = styled.div<ChatTextProps>`
	display: flex;
	padding: 1em 1em;
	max-width: 30em;
	min-height: 4em;
	background: #ffffff;
	color: #855d89;
	border-radius: 0.5em;
	justify-content: flex-start;
	align-content: flex-start;
	align-items: flex-start;
	word-wrap: break-word;
	overflow: hidden;
	flex-wrap: wrap;
`;

export const Information = styled.div<InformationProps>`
	display: flex;
	flex-direction: row;
	justify-content: ${(props) =>
		props.userId === props.latestUser ? "flex-end" : null};
	align-content: center;
	align-items: center;
`;

export const ImageContainer = styled.div`
	text-align: center;
`;

const handleUserIcon = (icon: string) => {
	switch (icon) {
		case "Sam":
			return PersonIconSam;
		case "Russell":
			return PersonIconRussell;
		default:
			return PersonIconJoyse;
	}
};

export const PersonIcon = styled.div<IconProps>`
	height: 4em;
	width: 4em;
	margin-right: 0.5em;
	margin-left: 0.5em;
	background-image: url(${(props) => handleUserIcon(props.userId)});
	background-size: cover;
`;

export const FetchButton = styled.button`
	display: flex;
	width: 10em;
	color: #fff;
	background-color: #17a2b8;
	border-color: #17a2b8;
	font-weight: 400;
	text-align: center;
	vertical-align: middle;
	border: 1px solid transparent;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	border-radius: 0.25rem;
	justify-content: space-evenly;
	align-items: center;
`;
