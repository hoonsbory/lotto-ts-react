import styled from 'styled-components'

interface spanProps{
    corrected?: boolean
}

type resultProps = {
    num : number
    correct : boolean
}

const NumSpan = styled.span<spanProps>`
    display : inline-block;
    width : 30px;
    border : 0;
    padding : 5px 0px;
    margin-bottom : 5px;
    margin-right : 5px;
    background : ${props => props.corrected ? "black" : "#EAEAEA"};
    color : ${props => props.corrected ? "white" : "black"};
    border-radius : 50px;
    font-weight : 600;
`

const ResultNum = ({num,correct}:resultProps) => {
    return (
        <NumSpan corrected={correct}>
            {num}
        </NumSpan>
    )
}

export default ResultNum
