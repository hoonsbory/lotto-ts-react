import TsTest from './pages/Draw';
import SelectNum from './pages/SelectNum';
import { useDispatch } from 'react-redux';
import { actionCreators } from './store/store';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components'

const RootDiv = styled.div`
  animation: ${props=> props.theme.fadeUp} .5s linear alternate;
`
const HeadLine = styled.h2`
position: relative;
bottom: 10vh;
`

let pcCheck:string = window.navigator.userAgent.indexOf("Mobile") > -1 ? "true" : "false"
sessionStorage.setItem("mobile",pcCheck)

function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const addList = (newList: number[]) => {
    dispatch(actionCreators.list(newList))
  }
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <RootDiv className="App">
          <HeadLine>로또 추첨기 with TypeScript</HeadLine>
          <Route exact path='/' render={()=> <SelectNum addList={addList}></SelectNum>}></Route>
          <Route path='/result' component={TsTest}></Route>
        </RootDiv>
      </Switch>
    </Router>
  );
}

export default App;
