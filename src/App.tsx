import SelectNum from './sections/SelectNum';
import styled from 'styled-components'
import ChartSelect from './sections/ChartSelect';
import SearchLotto from './sections/SearchLotto';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import HallOfFame from './sections/HallOfFame';
import './App.css'
import UserResult from './sections/UserResult';
import Footer from './sections/Footer';
import {useEffect} from 'react'
import Loading from './components/Loading';


if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const HeadLine = styled.h2`
position: relative;
`


let pcCheck:string = window.navigator.userAgent.indexOf("Mobile") > -1 ? "true" : "false"
sessionStorage.setItem("mobile",pcCheck)

function App() {
  useEffect(() => {
    
  }, [])
  
  return (
        <div className="App">
          <h1>{process.env.REACT_APP_API_KEY}</h1>
          {/* <HeadLine>로또 추첨기 with TypeScript</HeadLine> */}
          <SearchLotto></SearchLotto>
          <SelectNum></SelectNum>
          {/* <Route path='/result' component={TsTest}></Route> */}
          <ChartSelect></ChartSelect>
          <HallOfFame></HallOfFame>
          <UserResult></UserResult>
          <Footer></Footer>
          <Loading></Loading>
        </div>
  );
}

export default App;
