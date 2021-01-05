import { useState, useEffect } from 'react'
import SubTitle from '../components/SubTitle'
import Axios from 'axios'
import ButtonGroup from '../components/ButtonGroup'
import NumLineWrap from '../components/NumLineWrap'
import ResultNum from '../components/ResultNum'
import LineDiv from '../components/LineDiv'
import { Debounce } from '../Debounce'
import NobodyWin from '../components/NobodyWin'
import styled from 'styled-components'

type props ={
    check: boolean
}

const GroupWrapper = styled.div`
    margin-bottom : 15px;
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
    margin-right : 10px;
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
            console.log(res.data)
                setNumList(res.data.data.winDataByRank)
            })
    }
    const [selectBtn, setSelectBtn] = useState<boolean[]>([true, false, false])
    const [numList, setNumList] = useState<any[]>([])

    useEffect(() => {
        getWinData("first")
    }, [])

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
            {numList.length===0 ? <NobodyWin content="당첨된 사람이 없습니다. 당첨에 도전해보세요!"></NobodyWin>: ''}
            {numList.map((obj,idx) => {
                var numCheck = idx%2===1 ? true : false
                return (
                    <NumWrapper check={numCheck}>
                        <NameSpan>{obj.name}</NameSpan>
                    {Object.keys(obj).map(x => {
                        if (x !== "name")
                            return <ResultNum num={obj[x][0]} bonusCorrect={obj[x][1] === 2 ? true : false} correct={obj[x][1] === 1 ? true : false}></ResultNum>
                    })}
                    </NumWrapper>
                )
            })}
        </Section>
    )
}

export default HallOfFame
