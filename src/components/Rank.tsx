import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RankResult } from '../models/RankResult.js'
import { RankResultNum } from '../models/RankResultNum'
import Axios from 'axios'

type props = {
    trigger?: boolean
    list: number[]
    bonusCorrect: boolean[]
    correct: boolean[]
    listSize: number
    idx: number
    rankResult: RankResult
    rankResultNum: RankResultNum
    setUserResult: Function
    hide?: boolean
}

type RankProps = {
    bg: string
    hide?: boolean
}

const RankSpan = styled.span<RankProps>`
    background: ${props => props.bg || 'none'};
    border-radius: 5px;
    padding: 5px;
    color: white;
    float : left;
    display : ${props => props.hide ? "none" : "block"}
`


const Rank: any = ({ rankResultNum, rankResult, hide, list, listSize, idx, correct, bonusCorrect, setUserResult, trigger }: props) => {
    const [rankColor, setRankColor] = useState<string[]>(["", ""])


    const result = () => {
        var correctList: any = list.map((x, idx) => { if (correct[x]) return idx }).filter((x: any) => x >= 0)
        var bonusNum: number = bonusCorrect.indexOf(true)
        var bonus: boolean = list.includes(bonusNum)
        if (correctList.length < 3) {
            rankResult.setLast()
            return ["꽝", "black"]
        }
        else if (correctList.length === 3) {
            rankResult.setFifth()
            return ["5등", "darkslateblue"]
        }
        else if (correctList.length === 4) {
            var list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            console.log(hide)
            rankResult.setFourth()
            rankResultNum.setFourthNums(list2)
            return ["4등", "darkgoldenrod"]
        }
        else if (correctList.length === 5 && !bonus) {
            var list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            console.log(123)
            rankResult.setThird()
            rankResultNum.setThirdNums(list2)
            return ["3등", "darkcyan"]
        }
        else if (correctList.length === 5) {
            var list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            list2[list.indexOf(bonusNum)] = [list2[list.indexOf(bonusNum)], 2]
            rankResult.setSecond()
            rankResultNum.setSecondNums(list2)
            return ["2등", "cornflowerblue"]
        }
        else {
            var list2: any = [...list]
            correctList.forEach((i: any) => {
                list2[i] = [list2[i], 1]
            })
            rankResult.setFirst()
            rankResultNum.setFirstNums(list2)
            return ["1등", "coral"]
        }
    }

    const sendResult = async (sumResult: RankResult, resultNums: RankResultNum) => {
        await Axios.post(`${process.env.REACT_APP_URL}/winData`, { sumResult: sumResult, resultNums: resultNums })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // if (hide) document.getElementById("rankSpan" + idx)?.remove()
        setRankColor(result())
        if (listSize - 1 === idx) {
            var rank = rankResult.getFirst > 0 ? 1 : (rankResult.getSecond > 0 ? 2 : (rankResult.getThird > 0 ? 3 : (rankResult.getFourth > 0 ? 4 : 0)))
            if (rank > 0 && rank < 4) {
                var name = window.prompt(`축하합니다 ${rank}등에 당첨되셨습니다! 명예의 전당에 올릴 성함(닉네임)을 알려주세요! 취소를 누르시면 익명으로 등록됩니다.   **1글자 ~ 10글자**`)?.trim() || "익명"
                while (true) {
                    if (name.length > 10)
                        name = window.prompt("10글자 이하로 부탁드립니다 취소를 누르시면 익명으로 등록됩니다.") || "익명"
                    else break;
                }
                rankResultNum.setWinnerName(name)
            }
            console.log(rankResultNum)
            sendResult(rankResult, rankResultNum)
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
            var footerBtn: any = document.getElementById("footerBtn")?.firstChild
            if (footerBtn.style.transform.indexOf("180") < 0)
                document.getElementById("footerBtn")?.click()
            if (rank === 0) alert("4등 이상 당첨된 로또가 없습니다 ㅜ_ㅜ")

        }

    }, [])

    return (
        // <RankSpan id={"rankSpan" + idx} hide={hide} bg={rankColor[1]}>
        //     {rankColor[0]}
        // </RankSpan>
        hide ? '' : <RankSpan id={"rankSpan" + idx} hide={hide} bg={rankColor[1]}>
            {rankColor[0]}
        </RankSpan>
    )
}

export default Rank
