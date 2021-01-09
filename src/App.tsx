import FakeLotto from './sections/FakeLotto';
import ChartSelect from './sections/ChartSelect';
import SearchLotto from './sections/SearchLotto';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import HallOfFame from './sections/HallOfFame';
import './App.css'
import UserResult from './sections/UserResult';
import Footer from './sections/Footer';
import {useEffect} from 'react'
import Loading from './components/Loading';
import UpdateInterval from './components/UpdateInterval'
import LottoLogo from './components/LottoLogo';
import styled from 'styled-components'
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}
 
const Div = styled.div`
animation: ${props => props.theme.fadeUp2} .4s linear alternate;
`

let pcCheck:string = window.navigator.userAgent.indexOf("Mobile") > -1 ? "true" : "false"
sessionStorage.setItem("mobile",pcCheck)

function App() {
    UpdateInterval()
  
  return (
        <Div className="App">
          <LottoLogo></LottoLogo>
          <SearchLotto></SearchLotto>
          <FakeLotto></FakeLotto>
          <ChartSelect></ChartSelect>
          <HallOfFame></HallOfFame>
          <UserResult></UserResult>
          <Footer></Footer>
          <Loading></Loading>
        </Div>
  );
}

export default App;
