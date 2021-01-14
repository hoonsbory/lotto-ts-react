import FakeLotto from './sections/FakeLotto';
import ChartSelect from './sections/ChartSelect';
import SearchLotto from './sections/SearchLotto';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import HallOfFame from './sections/HallOfFame';
import './App.css'
import UserResult from './sections/UserResult';
import Footer from './sections/Footer';
import { useEffect } from 'react'
import Loading from './components/Loading';
import UpdateInterval from './components/UpdateInterval'
import LottoLogo from './components/LottoLogo';
import styled from 'styled-components'
import LeftAd from './components/LeftAd';
import RightAd from './components/RightAd';
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const Div = styled.div`
animation: ${props => props.theme.fadeUp2} .4s linear alternate;
`

let ua: string = window.navigator.userAgent

let pcCheck: string = ua.indexOf("Mobile") > -1 ? "true" : "false"
sessionStorage.setItem("mobile", pcCheck)

function App() {
  UpdateInterval()

  return (
    <Div className="App">
      {/* <LeftAd></LeftAd> */}
      {window.innerWidth > 1000 ? <RightAd></RightAd> : ''}
      <LottoLogo></LottoLogo>
      <SearchLotto></SearchLotto>
      <FakeLotto></FakeLotto>
      <ins className="kakao_ad_area" style={{ display: "none" }}
        data-ad-unit="DAN-dWQoWGSa7fy6ZEos"
        data-ad-width="320"
        data-ad-height="100"></ins>
      <ChartSelect></ChartSelect>
      <ins className="kakao_ad_area" style={{ display: "none" }}
        data-ad-unit="DAN-n2K2PnIQes1qQjCv"
        data-ad-width="320"
        data-ad-height="100"></ins>
      <HallOfFame></HallOfFame>
      <UserResult></UserResult>
      <Footer></Footer>
      <ins className="kakao_ad_area" style={{ display: "none", marginTop: "30px" }}
        data-ad-unit="DAN-H7w84ifiPoFw48Mx"
        data-ad-width="250"
        data-ad-height="250"></ins>
      <Loading></Loading>
    </Div>
  );
}

export default App;
