import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
  
    html {
        font-size: 62.5%;
        color: black;
        background: #eee;
    }
  
    body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Open Sans', sans-serif;
    }
    
    *:focus {
    outline: none;
}
`;

export default GlobalStyle;