import { css, keyframes } from 'styled-components'
// 재사용성 높은 css들 모아놓고 테마로 씀
const theme = {
  fadeUp: keyframes`
    0% {
      opacity: 0;
      transform : translateY(10px);
    }
    
    100% {
      opacity: 1;
      transform : translateY(0px);
    }
  `,
  fadeUp2: keyframes`
    0% {
      opacity: 0;
      transform : translateY(20px);
    }
    
    100% {
      opacity: 1;
      transform : translateY(0px);
    }
  `,
  flexDiv: css`
      display: flex;
      flex-direction: row;
    `,
  noneOutline: css`
    outline : 0;
    cursor : pointer;
    transition:all ease-out .3s;
    padding : 4px 8px;
    font-size : .9em;
    `,
  sectionCss: css`
    margin-bottom : 60px;
  `
}

export default theme