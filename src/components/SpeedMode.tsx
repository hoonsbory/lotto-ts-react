import styled from 'styled-components'
import Button from '../components/Button';
import { List } from 'react-virtualized';
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';
import { Debounce } from '../Debounce'
import Draw from '../sections/Draw';
import NumLineWrap from '../components/NumLineWrap';
import Rank from '../components/Rank';
import { RankResultNum } from '../models/RankResultNum';
import { RankResult } from '../models/RankResult';
import { useState, useRef } from 'react'
import Axios from 'axios'
import InsertHOF from './InsertHOF';

//스피드모드


const ScrollList = styled.div`
    overflow-y : auto;
    max-height : ${window.innerHeight / 2}px;
`
const SmallSpan = styled.span`
    color : gray;
    font-size : 12px;
`

type props = {
    list: number[][]
    draw: boolean
    correct: boolean[]
    bonusCorrect: boolean[]
    trigger: boolean
    setList: Function
    setDraw: Function
    setCorrect: Function
    setbonusCorrect: Function
    setTrigger: Function
    setUserResult: Function
}

const SpeedMode = ({ list, draw, correct, bonusCorrect, trigger, setList, setUserResult, setDraw, setTrigger, setCorrect, setbonusCorrect }: props) => {

    const [rank, setRank] = useState<number>(0)

    //랜덤으로 뽑기 
    //일반모드에 있는 랜덤은 실제로 버튼을 클릭하는 것을 10회 반복한 것 뿐이다.
    //스피드모드는 속도를 위해 반복문으로 배열을 만들어서 list에 추가함. 보여주기식이 아니라 그냥 결과만을 도출하기 위한 모드
    const randomTest = Debounce((count: number) => {
        document.getElementById("loadingBg")!.style.display = "block";
        setTrigger(false)
        setCorrect([])
        setbonusCorrect([])
        setDraw(false)
        var list: number[][] = []
        for (var i = 0; i < count; i++) {
            list[i] = []
            for (var j = 0; j < 6; j++) {
                while (true) {
                    var num = Math.floor((Math.random() * 45) + 1)
                    if (!list[i].includes(num)) {
                        list[i][j] = num
                        break;
                    }
                }
            }
        }
        setList(list)
        setTimeout(() => {
            setDraw(true)
        }, 100);
    }, 400)


    //리스트 내용은 일반모드랑 거의 같음.
    const rowRenderer = (
        () => {
            return (
                <ScrollList id="lottoList">
                    {trigger ? list.map((i, idx) => {
                        var length = i.map(x => { if (correct[x]) return x; return undefined }).filter(x => x)

                        if (length.length > 3)
                            return (
                                <NumLineWrap hide={true} idx={idx} key={idx} content={<span><Rank
                                    setRank={setRank}
                                    setUserResult={setUserResult}
                                    rankResultNum={rankResultNum.current}
                                    rankResult={rankResult.current}
                                    listSize={list.length}
                                    idx={idx}
                                    hide={false}
                                    list={list[idx]}
                                    correct={correct}
                                    bonusCorrect={bonusCorrect}
                                    trigger={trigger}></Rank>
                                    {list[idx].sort((a, b) => a - b).map((x, idx) =>
                                        <ResultNum key={idx} bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x}></ResultNum>)}</span>
                                }></NumLineWrap>)
                        else {
                            return (
                                <Rank idx={idx} key={idx}
                                    setRank={setRank}
                                    setUserResult={setUserResult}
                                    rankResultNum={rankResultNum.current}
                                    rankResult={rankResult.current}
                                    listSize={list.length}
                                    list={list[idx]}
                                    hide={true}
                                    correct={correct}
                                    bonusCorrect={bonusCorrect}
                                    trigger={trigger}></Rank>
                            )
                        }
                    }) : ''}
                </ScrollList>
            );
        })

    //최종 데이터 전송. 원래 rank 컴포넌트에서 전송했었는데, 명예의전당의 이름을 prompt로 받을때, 유저가 해당탭을 최상위로 사용중이지 않다면 
    //prompt가 cancel된다. 결국 모달을 만들어서 이름을 받게 됐다.
    const sendResult = Debounce(async () => {
        var name = input.current.trim()
        if(name.length<2||name.length>15){
            alert("최소 2글자에서 최대 15글자까지 입력해주세요.")
            return
        }
        var loading = document.getElementById("loadingBg")
        var text = loading!.firstElementChild!.firstElementChild!.nextElementSibling!
        text.innerHTML = "이름을 등록 중입니다"
        loading!.style.display = "block"
        rankResultNum.current.setWinnerName(name)
        await Axios.post(`${process.env.REACT_APP_URL}/winData`, { sumResult: rankResult.current, resultNums: rankResultNum.current })
            .then(res => {
                loading!.style.display = "none"
                text.innerHTML = "번호를 조합 중입니다"
                if(window.confirm("명예의 전당에 등록되었습니다! 확인하시겠습니까?")){
                    document.getElementById(`HOF${rank===1? rank+1 : rank-1}`)?.click()
                    setTimeout(() => {
                        document.getElementById(`HOF${rank}`)?.click()
                        document.getElementById("HOF")?.scrollIntoView()
                    }, 200);
                }
                setRank(0)
                rankResult.current = new RankResult()
                rankResultNum.current = new RankResultNum()
            })
            .catch(err => console.log(err))
    },300)

    const input = useRef('')
    const handleChange = (e: any) => {
        input.current = e.target.value
    }

    var rankResult = useRef(new RankResult())
    var rankResultNum = useRef(new RankResultNum())
    const refReset = () => {
        rankResult.current = new RankResult()
        rankResultNum.current = new RankResultNum()
    }
    return (
        <div>
            {rank > 0 && rank < 4 ? <InsertHOF rank={rank} handleChange={handleChange} sendResult={sendResult}></InsertHOF> : refReset()}
            <Button id="randomBtn" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="50만원" click={() => randomTest(200)}></Button>
            <Button id="lineAdd" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="100만원" click={() => randomTest(1000)}></Button>
            <Button fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="500만원" click={() => randomTest(5000)}></Button>
            <Button fontSize={"1.0em"} color="rgb(255,94,0)" bg="rgba(255,94,0,.12)" hoverBg="rgb(255,94,0)" content="1000만원" click={() => randomTest(10000)}></Button>
            {draw ? <Draw mode={true} bonusCorrect={bonusCorrect} setbonusCorrect={setbonusCorrect} trigger={trigger} setTrigger={setTrigger} list={list} setDraw={setDraw} setCorrect={setCorrect} correct={correct}></Draw> : ''}
            <LineDiv content="4등 이상 당첨 번호"></LineDiv>
            <SmallSpan id="noticeNoWin">버튼을 눌러 로또를 구매하세요!</SmallSpan>
            <List
                width={1}
                height={1}
                overscanRowsCount={1}
                rowCount={1}
                rowHeight={40}
                rowRenderer={rowRenderer}
                containerStyle={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "100%",
                    maxHeight: "100%"
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
            </List>
        </div>
    )
}

export default SpeedMode

