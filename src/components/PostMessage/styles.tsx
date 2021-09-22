import styled from "styled-components";

interface FormProps {
	direction?: string;
	content?: string;
	height?: string;
}

export const Form = styled.div<FormProps>`
	display: flex;
	background: ${(props) => props.color};
	flex-direction: ${(props) => (props.direction ? props.direction : "row")};
	justify-content: ${(props) => (props.content ? props.content : "center")};
	height: ${(props) => props.height};
	width: 100%;
`;

export const SendButton = styled.button`
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
	cursor: pointer;
	:hover{
     background: #138496;
}
`;

export const TextArea = styled.textarea`
	height: 10em;
	display: block;
	width: 95%;
	border: 1px solid #ced4da;
	background-clip: padding-box;
	padding-bottom: 6px;
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 6px;
	background-color: #fff;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	font-family: inherit;
	color: #495057;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	
`;
