import styled from 'styled-components'

const RightAdDiv = styled.div`
  position : fixed;
  top : 50%;
  transform : translateY(-50%);
  right : ${window.innerWidth / 2 - 440}px;
`

window.addEventListener('resize', ()=>{
    document.getElementById("rightAd")!.style.right = (window.innerWidth /2 -440) + "px"
})

const RightAd = () => {
    return (
        <RightAdDiv id="rightAd">
            <ins className="kakao_ad_area" style={{ display: "none" }}
                data-ad-unit="DAN-NpuSKrAClGNv1yFA"
                data-ad-width="160"
                data-ad-height="600"></ins>
        </RightAdDiv>
    )
}

export default RightAd
