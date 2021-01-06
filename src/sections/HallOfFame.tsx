import { useState, useEffect } from 'react'
import SubTitle from '../components/SubTitle'
import Axios from 'axios'
import ButtonGroup from '../components/ButtonGroup'
import ResultNum from '../components/ResultNum'
import LineDiv from '../components/LineDiv'
import { Debounce } from '../Debounce'
import NobodyWin from '../components/NobodyWin'
import styled from 'styled-components'
//명예의 전당
type props ={
    check: boolean
}

const GroupWrapper = styled.div`
    margin-bottom : 15px;
`
const ScrollList = styled.div`
    overflow-y : auto;
    max-height : ${window.innerHeight / 2}px;
`

const Section = styled.div`
    ${props=> props.theme.sectionCss}
`

const NumWrapper = styled.div<props>`
    background : ${props=> props.check ? "rgba(224,230,251,.35)" : "none"};
    padding : 10px 0;
    border-radius : 10px;
`

const NameSpan = styled.span`
    font-size : 12px;
    font-weight : 600;
    margin-bottom : 10px;
    text-decoration : underline;
    display : block;
`


const HallOfFame = () => {

    const getWinData = (rank: string) => {
        Axios.post(`${process.env.REACT_APP_URL}/`, {
            query: `
        query{    
            winDataByRank(rank:"${rank}"){
                num1 num2 num3 num4 num5 num6 name
            }
        }
        `}).then(res => {
                setNumList(res.data.data.winDataByRank)
            })
    }
    //토글 버튼
    const [selectBtn, setSelectBtn] = useState<boolean[]>([true, false, false])
    //받아온 win데이터
    const [numList, setNumList] = useState<any[]>([])

    useEffect(() => {
        //초기값은 1등한 사람
        getWinData("first")
    }, [])

    //토글 버튼 state변경 및 데이터 가져오기
    const selected = Debounce((idx: number) => {
        if(selectBtn[idx]) return
        setSelectBtn(selectBtn.map((i, idx2) => {
            if (idx === idx2) return true
            else return false
        }))
        switch (idx) {
            case 0:
                getWinData("first")
                break;
            case 1:
                getWinData("second")
                break;
            case 2:
                getWinData("third")
                break;

            default:
                break;
        }
    },200)



    return (
        <Section>
            <SubTitle content={"명예의 전당"}></SubTitle>
            <GroupWrapper>
            <LineDiv content={<ButtonGroup content={["1등", "2등", "3등"]} selected={selectBtn} click={[selected, selected, selected]}></ButtonGroup>}></LineDiv>
            </GroupWrapper>
            <ScrollList>
            {numList.length===0 ? <NobodyWin content="당첨된 사람이 없습니다. 당첨에 도전해보세요!"></NobodyWin>: ''}
            {numList.map((obj,idx) => {
                var numCheck = idx%2===0 ? true : false
                return (

                    <NumWrapper key={idx} check={numCheck}>
                    <NameSpan>{obj.name}</NameSpan>
                    {Object.keys(obj).map((x,idx) => {
                        if (x !== "name") //이름은 위에서 출력하기 때문에 건너뛰어준다. 1과 2는 맞춘 번호와 맞춘 보너스 번호를 검증하기 위함이다. 
                            return <ResultNum key={idx} num={obj[x][0]} bonusCorrect={obj[x][1] === 2 ? true : false} correct={obj[x][1] === 1 ? true : false}></ResultNum> 
                        return undefined
                    })}
                    </NumWrapper>
                )
            })}
            </ScrollList>
        </Section>
    )
}

export default HallOfFame
