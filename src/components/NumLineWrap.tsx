import React from 'react'
import styled from 'styled-components'

//번호 6개 감싸는 p태그 짝수번째에 bg

const NumLineWrapper = styled.p<props>`
    border-bottom : 1px solid rgba(134,134,134,0.19);
    padding-bottom : 15px;
    margin-bottom : 0;
    margin-top : 0;
    padding-top: 15px;
    padding-left : 5px;
    background : ${props => props.hide ? "unset" : (props.idx%2 ? "unset" : "rgba(134,134,134,0.19)")};
    animation: ${props => props.theme.fadeUp} .5s linear alternate;
    border-radius : 10px;
`
type props = {
    content? : any
    idx: number
    hide?: boolean
}

const NumLineWrap = ({content,idx,hide}:props) => {
    return (
        <NumLineWrapper idx={idx+1} hide={hide}>
            {content}
        </NumLineWrapper>
    )
}

export default NumLineWrap
