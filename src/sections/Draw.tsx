import React, { useState, useCallback, useEffect } from 'react'
import { Debounce } from '../Debounce'
import Button from '../components/Button'
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';
import styled from 'styled-components'
import NumLineWrap from '../components/NumLineWrap';

const Div = styled.div`
    border-top : 1px solid rgba(134,134,134,0.19);
    background: rgba(134,134,134,0.07);
    animation: ${props => props.theme.fadeUp} .5s linear alternate;
    margin-bottom : 15px;
    margin-top : 15px;
`
const SmallDiv = styled.div`
    color : gray;
    font-size : 12px;
`
type props = {
    list: number[][]
    setDraw: Function
    setCorrect: Function
    correct: boolean[]
    setbonusCorrect: Function
    bonusCorrect: boolean[]
    setTrigger: Function
    trigger: boolean
    mode: boolean
}

const Draw = ({ trigger, setTrigger, list, setDraw, setCorrect, correct, setbonusCorrect, bonusCorrect, mode }: props) => {

    //useSelector로 state에 접근
    // var list = useSelector((state: StoreState) => state.Reducer.list);
    const [result, setResult] = useState<number[]>([]);
    //정답 유무를 구별할 boolean 배열. 동적으로 style component를 변경하려면 props를 state로 관리해야한다. 
    // const [correct,setCorrect] = useState<boolean[]>([])

    let id: NodeJS.Timeout;

    useEffect(() => {
        console.log(mode)
        if (mode) {
            random([])
            console.log(result)
            stop(correct, bonusCorrect, result, list)
        }
    }, [])


    const random = useCallback((arr: Array<number>) => {
        document.getElementById('startBtn')?.setAttribute("disabled", "true");
        var num = document.getElementById("num")
        id = setInterval(() => {
            if (!num) clearInterval(id)
            while (num) {
                let number = Math.floor((Math.random() * 45) + 1)
                if (!arr.includes(number)) {
                    num.innerText = number.toString()
                    break;
                }
            }
        }, 50);
    }, [])

    //state가 변경되어 렌더링이 되면 이전에 시작된 interval값을 찾지 못하기 때문에 usecallback으로 함수 재생성을 막아줘야함.
    const stop = Debounce(useCallback((correct: Array<boolean>, bonusCorrect: Array<boolean>, result: Array<number>, list: Array<number[]>) => {

        let num = parseInt(document.getElementById('num')!.innerText)
        if (num === 0) return
        clearInterval(id)
        for (var i = 0; i < list.length; i++) {
            if (list[i].includes(num)) {
                if (result.length !== 6) {
                    correct[num] = true;
                    setCorrect([...correct])
                    break
                }
                else {
                    bonusCorrect[num] = true;
                    setbonusCorrect([...bonusCorrect])
                    break
                }
            }
        }
        // list.forEach(i => {
        //     if (i.includes(num)) {
        //         if (result.length !== 6) {
        //             correct[num] = true;
        //             setCorrect([...correct])
        //             console.log(2)
        //             return
        //         }
        //         else {
        //             bonusCorrect[num] = true;
        //             setbonusCorrect([...bonusCorrect])
        //             console.log(3)
        //             return
        //         }
        //     }
        //     console.log(1)
        // })
        setResult([...result, num])



        if (result.length < 6)
            setTimeout(() => {
                random([...result, num])
                if (mode)
                    document.getElementById('stopBtn')?.click()
            }, 600);

        else {
            document.getElementById("loadingBg")!.style.display = "none";
            document.getElementById('stopBtn')!.setAttribute("disabled", "true");
            setTrigger(true)
            // setTimeout(() => {
            //     alert(`${correct.filter(x => x).length}개 맞추셨습니다!`)
            // }, 500);
        }
    }, []), 700)

    const reset = useCallback(() => {
        clearInterval(id)
        document.getElementById('num')!.innerText = "0"
        setCorrect([])
        setbonusCorrect([])
        setResult([])
        setTimeout(() => {
            setTrigger(false)
        }, 200);

        document.getElementById('stopBtn')!.removeAttribute("disabled")
        document.getElementById('startBtn')!.removeAttribute("disabled")
    }, [])

    return (
        <Div id="drawSec">
            <h1 id="num" style={{ fontSize: "30px" }}>0</h1>
            <div style={{display : mode ? "none" : "block"}}>
                <Button fontSize="1.1em" id="startBtn" content="추첨시작" click={() => random([])}></Button>
                <Button fontSize="1.1em" id="stopBtn" click={() => stop(correct, bonusCorrect, result, list)} content="뽑기"></Button>
                <Button fontSize="1.1em" id="resetBtn" color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" click={reset} content="초기화"></Button>
            </div>
            <LineDiv fontSize={15} content="추첨 결과"></LineDiv>
            <NumLineWrap content={result.length === 0 ? <SmallDiv>추첨시작을 누른 후 당첨숫자를 뽑아보세요</SmallDiv> : result.map((x, idx) => {
                if (idx === 6)
                    return (
                        <span id="bonusSpan">+  <ResultNum bonusCorrect={bonusCorrect[x]} correct={correct[x]} bonus={true} num={x}></ResultNum></span>
                    )
                else
                    return (
                        <ResultNum bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x}></ResultNum>
                    )
            })}></NumLineWrap>
        </Div>
    )
}

export default Draw
