import styled from 'styled-components'

//내가 뽑은 혹은 추첨한 로또 번호 리스트로 뿌려줄 span
interface spanProps{
    //맞춘 번호는 색다르게.
    corrected?: boolean
}

type resultProps = {
    num : number
    correct? : boolean
}

const NumSpan = styled.span<spanProps>`
    animation: ${props=> props.theme.fadeUp} .5s linear alternate;
    display : inline-block;
    width : 30px;
    border : 1px solid rgba(86, 115, 235, 0.19);
    padding : 5px 0px;
    margin-bottom : 5px;
    margin-right : 5px;
    background : ${props => props.corrected ? "rgba(235, 83, 116,.12)" : "white"};
    color : ${props => props.corrected ? "rgb(235, 83, 116)" : "rgb(70, 77, 82)"};
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
