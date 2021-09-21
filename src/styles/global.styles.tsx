import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        max-width: 100%;
        box-sizing: border-box;
    }

    #root {
        margin: 0 auto;
   }

   html {
    font-family: sans-serif;
    line-height: 1.15;
    height: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

body {
    height: 100vh;
    width: 100vw;
    background-color: #F4F5FB;
}
`;
