import styled from 'styled-components'

//내가 뽑은 혹은 추첨한 로또 번호 리스트로 뿌려줄 span
interface spanProps{
    //맞춘 번호는 색다르게.
    bonus? : boolean
    corrected?: boolean
    bonusCorrect?: boolean

}

interface resultProps {
    num : number
    bonus? : boolean
    correct? : boolean
    bonusCorrect? : boolean

}

const NumSpan = styled.span<spanProps>`
    animation: ${props=> props.theme.fadeUp} .4s linear alternate;
    display : inline-block;
    width : 2.2em;
    height : 2.2em;
    line-height : 2.2em;
    border : 1px solid rgba(86, 115, 235, 0.19);
    margin-right : 5px;
    background : ${props => props.bonusCorrect || props.bonus ? "rgb(224,230,251)" : (props.corrected ? "rgba(235, 83, 116,.12)" :  "white")};
    color : ${props => props.corrected ? "rgb(235, 83, 116)" : "rgb(70, 77, 82)"};
    border-radius : 1500px;
    font-size : .9em !important;
    font-weight : 600;
`
const ResultNum = ({num,correct,bonusCorrect,bonus}:resultProps) => {
    return (
        <NumSpan className="resultNum" bonusCorrect={bonusCorrect} corrected={correct} bonus={bonus}>
            {num}
        </NumSpan>
    )
}

export default ResultNum
