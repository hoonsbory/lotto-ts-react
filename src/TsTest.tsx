import { useState, useEffect, useCallback } from 'react'
import { Debounce } from './Debounce'
type testProps = {
    testprops: string
}


const TsTest: React.FC<testProps> = ({ testprops }) => {
    const [num, setNum] = useState(0)
    const [result, setResult] = useState<number[]>([]);

    let id: NodeJS.Timeout;

    const random = (arr: any[]) => {
        document.getElementById('startBtn')?.setAttribute("disabled","true");
        id = setInterval(() => {
            while (true) {
                let number = Math.floor((Math.random() * 45) + 1)
                if (!arr.includes(number)) {
                    setNum(number)
                    break;
                }
            }
        }, 50);
    }

    const stop = Debounce(useCallback((num :number, result :Array<number>) => {
        if(num===0) return
        clearInterval(id)
        const myElement = document.getElementById('num')!;
        myElement.innerText = num.toString()
        setResult([...result, num])
        if(result.length<5)
        setTimeout(() => {
            random([...result,num])
        }, 700);
        else  document.getElementById('stopBtn')?.setAttribute("disabled","true");
        
    }, []),700)


    return (
        <div>
            <h1 id="num">{num}</h1>
            <button id="startBtn" onClick={()=>random([])}>추첨시작</button>
            <button id="stopBtn" onClick={() => stop(num,result)}>뽑기</button>
            <p>추첨 결과 : {result.sort((a,b)=> a-b).map(x => `${x}  `)}</p>
        </div>
    )
}

export default TsTest
