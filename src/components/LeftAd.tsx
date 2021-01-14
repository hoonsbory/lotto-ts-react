import styled from 'styled-components'

const LeftAdDiv = styled.div`
  position : fixed;
  top : 50%;
  transform : translateY(-50%);
  left : ${window.innerWidth / 2 - 440}px;
`


const LeftAd = () => {
    return (
        <LeftAdDiv id="leftAd">
            <ins className="kakao_ad_area" style={{ display: "none" }}
                data-ad-unit="DAN-7XaMuZ0NPs6Aiypn"
                data-ad-width="160"
                data-ad-height="600"></ins>
        </LeftAdDiv>
    )
}

export default LeftAd
