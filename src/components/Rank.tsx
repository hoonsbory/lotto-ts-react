import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RankResult } from '../models/RankResult.js'
import { RankResultNum } from '../models/RankResultNum'
import Axios from 'axios'
//결과를 출력하는 컴포넌트. 도출부터 전송까지 여기서 다 함.
type props = {
    trigger?: boolean
    list: number[]
    bonusCorrect: boolean[]
    correct: boolean[]
    listSize: number
    idx: number
    rankResult: any
    rankResultNum: any
    setUserResult: Function
    hide?: boolean
    setRank:Function
}

type RankProps = {
    bg: string
    hide?: boolean
}

const RankSpan = styled.span<RankProps>`
    background: ${props => props.bg || 'none'};
    border-radius: 5px;
    padding: .3em;
    color: white;
    float : left;
`

const Rank:any = ({setRank, rankResultNum, rankResult, hide, list, listSize, idx, correct, bonusCorrect, setUserResult, trigger }: props) => {
    const [rankColor, setRankColor] = useState<string[]>(["", ""])
    //당첨 결과에 따른 bg를 담을 state


    const result = () => {
        //맞은 개수 계산
        var correctList: any = list.map((x, idx) => { if (correct[x]) return idx; else return undefined}).filter((x: any) => x >= 0)
        //이번 회차의 보너스 번호
        var bonusNum: number = bonusCorrect.indexOf(true)
        //보너스 번호를 맞췄는지 검증
        var bonus: boolean = list.includes(bonusNum)

        
        if (correctList.length < 3) {
            //각 결과마다 +1을 해주는 set 실행
            rankResult.setLast()
            //text와 색깔 리턴
            return ["꽝", "black"]
        }
        else if (correctList.length === 3) {
            rankResult.setFifth()
            return ["5등", "darkslateblue"]
        }
        else if (correctList.length === 4) {
            rankResult.setFourth()
            return ["4등", "darkgoldenrod"]
        }
        else if (correctList.length === 5 && !bonus) {
            let list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            rankResult.setThird()
            rankResultNum.setThirdNums(list2)
            return ["3등", "darkcyan"]
        }
        else if (correctList.length === 5) {
            //3등부터는 결과를 저장할거라서 맞춘 일반번호는 1, 보너스 번호는 2로 배열에 추가한다.
            let list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            list2[list.indexOf(bonusNum)] = [list2[list.indexOf(bonusNum)], 2]
            rankResult.setSecond()
            rankResultNum.setSecondNums(list2)
            return ["2등", "cornflowerblue"]
        }
        else {
            let list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            rankResult.setFirst()
            rankResultNum.setFirstNums(list2)
            return ["1등", "coral"]
        }
    }

    //db에 저장
    const sendResult = async (sumResult: RankResult, resultNums: RankResultNum) => {
        await Axios.post(`${process.env.REACT_APP_URL}/winData`, { sumResult: sumResult, resultNums: resultNums })
            .then()
            .catch()
    }

    useEffect(() => {
        setRankColor(result())
        //추첨이 끝나고 마지막에 실행
        if (listSize - 1 === idx) {
            //3등 이상은 이름을 입력받아서 저장
            var rank = rankResult.getFirst > 0 ? 1 : (rankResult.getSecond > 0 ? 2 : (rankResult.getThird > 0 ? 3 : (rankResult.getFourth > 0 ? 4 : 0)))
            if (rank > 0 && rank < 4) {
                setRank(rank)
                // alert(`축하합니다 ${rank}등에 당첨되셨습니다!`)
                // var name:any = window.prompt(`명예의 전당에 올릴 성함(닉네임)을 알려주세요! \n취소를 누르시면 익명으로 등록됩니다.  ※최대 10글자`) || "익명"
                // while (true) {
                //     console.log(name)
                //     if (name.length > 10)
                //         name = window.prompt("10글자 이하로 부탁드립니다 취소를 누르시면 익명으로 등록됩니다.") || "익명"
                //     else break;
                // }
                // rankResultNum.setWinnerName(name.trim())
            }
            else{
                sendResult(rankResult, rankResultNum)
            }
            if (rank === 0&&hide) document.getElementById("noticeNoWin")!.innerText = "4등 이상 당첨된 로또가 없습니다"
            else if(rank>0&&hide) document.getElementById("noticeNoWin")!.innerText = ""
            // sendResult(rankResult, rankResultNum)

            // //로컬스토리지에 있는 데이터를 가져와서 새 데이터와 합쳐서 다시 저장
            var pastResult = localStorage.getItem("userResult")
            if (pastResult) {
                var newResult = JSON.parse(pastResult);
                newResult.first += rankResult.getFirst
                newResult.second += rankResult.getSecond
                newResult.third += rankResult.getThird
                newResult.fourth += rankResult.getFourth
                newResult.fifth += rankResult.getFifth
                newResult.last += rankResult.getLast 
                setUserResult(newResult)
                localStorage.setItem("userResult", JSON.stringify(newResult))
            } else {
                localStorage.setItem("userResult", JSON.stringify(rankResult))
                setUserResult(rankResult)
            }
            //결과 나온 후 로또내역 보여주기 위해 footer up
            var footerBtn: any = document.getElementById("footerBtn")?.firstChild
            if (footerBtn.style.transform.indexOf("180") < 0)
                document.getElementById("footerBtn")?.click()
            
        }

    }, [])

    return (
        // <RankSpan id={"rankSpan" + idx} hide={hide} bg={rankColor[1]}>
        //     {rankColor[0]}
        // </RankSpan>
        hide ? '' : <RankSpan id={"rankSpan" + idx} bg={rankColor[1]}>
            {rankColor[0]}
        </RankSpan>
    )
}

export default Rank
