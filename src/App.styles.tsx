import styled from 'styled-components';

interface AppStyleProps {
    direction?: string;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
}

interface ColProps {
    direction?: string;
    height?: string
    color?: string;
    size?: number;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
}

export const Container = styled.div<AppStyleProps>`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: ${(props) => props.direction};
    padding-top: ${(props) => props.paddingTop};
    padding-left: ${(props) => props.paddingLeft};
    padding-right: ${(props) => props.paddingRight};
    padding-bottom: ${(props) => props.paddingBottom};
`;

export const Col = styled.div<ColProps>`
    flex-direction: ${(props) => props.direction};
    height: ${(props) => props.height};
    background: ${(props) => props.color};
    flex: ${(props) => props.size};
    padding-left: ${(props) => props.paddingLeft};
    padding-right: ${(props) => props.paddingRight};
    padding-bottom: ${(props) => props.paddingBottom};
`;

