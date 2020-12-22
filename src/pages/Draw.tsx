import React ,{ useState,  useCallback } from 'react'
import { Debounce } from '../Debounce'
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import Button from '../components/Button'
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';



const Draw = () => {
    
    //useSelector로 state에 접근
    var list = useSelector((state: StoreState) => state.Reducer.list);
    const [result, setResult] = useState<number[]>([]);
    //정답 유무를 구별할 boolean 배열. 동적으로 style component를 변경하려면 props를 state로 관리해야한다. 
    const [correct,setCorrect] = useState<boolean[]>([])

    let id: NodeJS.Timeout;
    
   

    const random = useCallback((arr: Array<number>) => {
        document.getElementById('startBtn')?.setAttribute("disabled","true");
        var num = document.getElementById("num")
        id = setInterval(() => {
            if(!num) clearInterval(id)
            while (num) {
                let number = Math.floor((Math.random() * 45) + 1)
                if (!arr.includes(number)) {
                     num.innerText = number.toString()
                    break;
                }
            }
        }, 50);
    },[])

    //state가 변경되어 렌더링이 되면 이전에 시작된 interval값을 찾지 못하기 때문에 usecallback으로 함수 재생성을 막아줘야함.
    const stop = Debounce(useCallback((correct:Array<boolean>, result :Array<number>,list:Array<number>) => {

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

        else  {
            document.getElementById('stopBtn')!.setAttribute("disabled","true");
            setTimeout(() => {
                alert(`${correct.filter(x=>x).length}개 맞추셨습니다!`)
            }, 500);
        }
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
            <Button id="startBtn" content="추첨시작" click={()=> random([])}></Button>
            <Button id="stopBtn" click={() => stop(correct,result,list)} content="뽑기"></Button>
            <Button id="resetBtn" color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" click={reset} content="초기화"></Button>
            <LineDiv content="추첨 결과"></LineDiv>
            <p>{result.map(x => <ResultNum correct={correct[x]} num={x}></ResultNum>)}</p>
            <LineDiv content="내가 고른 숫자"></LineDiv>
            <p>{list.sort((a,b)=> a-b).map(x => <ResultNum correct={correct[x]} num={x}></ResultNum>)}</p>
        </div>
    )
}

export default Draw
