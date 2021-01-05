import SnsGroup from "../components/SnsGroup"
import styled from 'styled-components'

const P = styled.p`
    color : #262626;
    margin-top : 50px;

`
const Div = styled.div`
    color : rgb(142, 142, 142);
    font-size : .8em;
`

const Span = styled.span`
    color : black;
    font-size : .9em;
`
const A = styled.a`
    color : rgb(142, 142, 142);
`

const Footer = () => {
    return (
        <div>
            <SnsGroup></SnsGroup>
            <Div>
            본 사이트의 모든 데이터는 로또 공식 홈페이지 동행복권의 자료를 활용하였습니다.
                <P>버그 제보 및 문의</P>
                <Span>개발자 신재훈 - </Span><A href="mailto:hoonsbory@gmail.com">hoonsbory@gmail.com</A>
            </Div>
        </div>
    )
}

export default Footer
