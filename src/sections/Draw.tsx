import React, { useState, useCallback, useEffect } from 'react'
import { Debounce } from '../Debounce'
import Button from '../components/Button'
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';
import styled from 'styled-components'
import NumLineWrap from '../components/NumLineWrap';
//번호 추첨기
const Div = styled.div`
    border-top : 1px solid rgba(134,134,134,0.19);
    background: rgba(134,134,134,0.07);
    animation: ${props => props.theme.fadeUp} .5s linear alternate;
    margin-bottom : 15px;
    margin-top : 15px;
`
const SmallSpan = styled.span`
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

const Draw = ({ setTrigger, list, setCorrect, correct, setbonusCorrect, bonusCorrect, mode }: props) => {

    //useSelector로 state에 접근
    // var list = useSelector((state: StoreState) => state.Reducer.list);
    const [result, setResult] = useState<number[]>([]);
    //정답 유무를 구별할 boolean 배열. 동적으로 style component를 변경하려면 props를 state로 관리해야한다. 
    // const [correct,setCorrect] = useState<boolean[]>([])

    //인터벌 변수
    let id: NodeJS.Timeout;



    useEffect(() => {
        //스피드모드 일때 자동으로 추첨 진행
        if (mode) {
            random([])
            stop(correct, bonusCorrect, result, list)
        }
    }, [])

    //랜덤으로 숫자 돌리기. 50ms마다 text의 숫자를 교체해준다. 이미 뽑힌 숫자는 제외한다.
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
        //인터벌 중지
        clearInterval(id)
        //랜덤에서 뽑힌 번호.
        let text:any = document.getElementById('num')?.innerText
        let num = parseInt(text)
        if (num === 0) return

        //유저가 뽑은 리스트를 순회하면서 맞춘 번호가 있으면 맞춘 번호 correct에 저장
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

        //뽑힌 번호리스트에 저장
        setResult([...result, num])


        //추첨이 다 안끝났으면 600ms후에 다시 랜덤으로 숫자 뽑기 시작. 
        //스피드 모드일 때는 유저가 클릭해서 하나씩 뽑지 않고 자동으로 진행하기 때문에 버튼 클릭
        if (result.length < 6)
            setTimeout(() => {
                random([...result, num])
                if (mode)
                    document.getElementById('stopBtn')?.click()
            }, 600);

        //번호가 다 뽑혔으면 트리거에 true를 줘서 Rank 컴포넌트에서 결과를 계산하게 함.
        else {
            document.getElementById("loadingBg")!.style.display = "none";
            document.getElementById('stopBtn')!.setAttribute("disabled", "true");
            setTrigger(true)
        }
    }, []), 700)


    //초기화. 인터벌도 중지 시키고 뽑힌 리스트도 초기화.
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
            <NumLineWrap idx={0} content={result.length === 0 ? <SmallSpan>추첨시작을 누른 후 당첨숫자를 뽑아보세요</SmallSpan> : result.map((x, idx) => {
                if (idx === 6)
                    return (
                        <span key={idx} id="bonusSpan">+  <ResultNum key={idx} bonusCorrect={bonusCorrect[x]} correct={correct[x]} bonus={true} num={x}></ResultNum></span>
                    )
                else
                    return (
                        <ResultNum key={idx} bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x}></ResultNum>
                    )
            })}></NumLineWrap>
        </Div>
    )
}

export default Draw
