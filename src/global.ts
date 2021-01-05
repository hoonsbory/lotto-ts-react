import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`

  html{
    scroll-behavior : smooth;
    -webkit-overflow-scrolling: touch;
    @import url('./App.css');
    font-family : 'Noto Sans' !important;
  }
  #root{
    box-sizing: border-box;
    padding: 12px 20px;
    color : #262626;
    text-align : center;
    align-items : center;
    margin: auto;
    width: 430px;
    overflow: hidden;
    min-height: 100vh;
    display : none;
    margin-bottom : 20vh;
  }
  .afterload{
    display : block;
  }
  @media(max-width : 414px){
    #root{
      width : 100%;
      font-size : 13px;
    }
  }
  @media(max-width : 325px){
    #root{
      width : 320px;
      font-size : 10px;
    }
  }
`

export default GlobalStyle