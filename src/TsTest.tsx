import React ,{ useState, useEffect, useCallback } from 'react'
import { Debounce } from './Debounce'
import { useSelector } from 'react-redux';
import { StoreState } from './store'
import styled from 'styled-components';
import Btn from './Button'
import ResultNum from './ResultNum';



const TsTest = () => {
    
    //useSelector로 state에 접근
    var list = useSelector((state: StoreState) => state.Reducer.list);
    const [result, setResult] = useState<number[]>([]);
    const [correct,setCorrect] = useState<boolean[]>([])

    let id: NodeJS.Timeout;

    

    const random = useCallback((arr: any[]) => {
        document.getElementById('startBtn')!.setAttribute("disabled","true");

        id = setInterval(() => {
            while (true) {
                let number = Math.floor((Math.random() * 6) + 1)
                if (!arr.includes(number)) {
                     document.getElementById('num')!.innerText = number.toString()

                    // setNum(number)
                    break;
                }
            }
        }, 50);
    },[])

    //state가 변경되어 렌더링이 되면 이전에 시작된 interval값을 찾지 못하기 때문에 usecallback으로 함수 재생성을 막아줘야함.
    const stop = Debounce(useCallback((result :Array<number>,list:Array<number>) => {

        let num = parseInt(document.getElementById('num')!.innerText)
        if(num===0) return
        clearInterval(id)
        if(list.includes(num)) {
            correct[num] = true;
            setCorrect([...correct])
        }
        setResult([...result, num])

        if(result.length<5)
        setTimeout(() => {
            random([...result,num])
        }, 700);

        else  document.getElementById('stopBtn')!.setAttribute("disabled","true");
    }, []),700)

    const reset = useCallback(() => {
        clearInterval(id)
        document.getElementById('num')!.innerText = "0"

        setResult([])
        setCorrect([])
        document.getElementById('stopBtn')!.removeAttribute("disabled")
        document.getElementById('startBtn')!.removeAttribute("disabled")
    },[])
 
    return (
        <div>
            <h1 id="num">0</h1>
            <Btn id="startBtn" content="추첨시작" click={()=> random([])}></Btn>
            <Btn id="stopBtn" click={() => stop(result,list)} content="뽑기"></Btn>
            <Btn id="resetBtn" color="white" bg="black" click={reset} content="초기화"></Btn>
            <p>추첨 결과 : {result.sort((a,b)=> a-b).map(x => <ResultNum correct={correct[x]} num={x}></ResultNum>)}</p>
            <p>내가 고른 숫자 : {list.sort((a,b)=> a-b).map(x => <ResultNum correct={correct[x]} num={x}></ResultNum>)}</p>
        </div>
    )
}

export default TsTest
