import SelectNum from './pages/SelectNum';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import ChartSelect from './pages/ChartSelect';
import SearchLotto from './pages/SearchLotto';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import HallOfFame from './pages/HallOfFame';
import './App.css'
import UserResult from './pages/UserResult';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const HeadLine = styled.h2`
position: relative;
`



let pcCheck:string = window.navigator.userAgent.indexOf("Mobile") > -1 ? "true" : "false"
sessionStorage.setItem("mobile",pcCheck)

function App() {
  
  
  return (
        <div className="App">
          <HeadLine>로또 추첨기 with TypeScript</HeadLine>
          <SearchLotto></SearchLotto>
          <SelectNum></SelectNum>
          {/* <Route path='/result' component={TsTest}></Route> */}
          <ChartSelect></ChartSelect>
          <HallOfFame></HallOfFame>
          <UserResult></UserResult>
        </div>
  );
}

export default App;
