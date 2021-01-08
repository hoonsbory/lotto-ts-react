import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`

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
      font-size : 12px;
    }
  }
`

export default GlobalStyle