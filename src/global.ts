import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    padding: 12px 20px;
    margin: auto;
    width: 400px;
    overflow: hidden;
    min-height: 100vh;
    box-sizing: border-box;
    text-align : center;
    align-items : center;
    display : grid;
    color : rgb(70, 77, 82);
  }
  
  @media(max-width : 400px){
    body{
      width : 100%;
    }
  }
`

export default GlobalStyle