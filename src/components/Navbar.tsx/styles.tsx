import styled from 'styled-components';

interface ContainerProps {
    direction?: string;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
}

interface RowProps {
    direction?: string;
    text?: string;
    height?: string;
}

interface ColProps {
    height?: string
    color?: string;
    size?: number;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: ${(props) => props.direction};
    padding-top: ${(props) => props.paddingTop};
    padding-left: ${(props) => props.paddingLeft};
    padding-right: ${(props) => props.paddingRight};
    padding-bottom: ${(props) => props.paddingBottom};
`;

export const Row = styled.div<RowProps>`
    display: flex;
    background: ${(props) => props.color};
    flex-direction: ${(props) => props.direction ? props.direction : "row" };
    color: ${(props) => props.text ? props.text : "white" };
    height: ${(props) => props.height};
    width: 100%;
`;

export const Col = styled.div<ColProps>`
    height: ${(props) => props.height};
    background: ${(props) => props.color};
    flex: ${(props) => props.size};
    border-right: 1px solid #e6ecf3;
    padding: 1rem 0;
`;

export const ChannelContainer = styled.div`
`;

export const ChooseChannel = styled.ul`
    list-style-type: none; 
    display: block; 
    margin-block-start: 1em;
    margin-block-end: 1em; 
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    li {
        box-sizing: border-box; 
        display: list-item; 
        position: relative; 
        width: 100%; 
        padding: 10px 1rem; 
        cursor: pointer; 
        background-color: #F4F5FB; 
    }

    li:hover {
            background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);
            border-bottom: 1px solid #f0f4f8;
        }

    li :active {
        background-color: #ffffff;
        background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);
        border-bottom: 1px solid #f0f4f8;
    }

    p {
        margin-block-start: 1em; 
        margin-block-end: 1em; 
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
`;
