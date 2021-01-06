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
    list:number[][]
    draw: boolean
    correct: boolean[]
    bonusCorrect:boolean[]
    trigger:boolean
    setList:Function
    setDraw:Function
    setCorrect:Function
    setbonusCorrect:Function
    setTrigger:Function
    setUserResult:Function
}

const SpeedMode = ({list,draw,correct,bonusCorrect,trigger,setList,setUserResult,setDraw,setTrigger,setCorrect,setbonusCorrect}:props) => {

   
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
                                <NumLineWrap hide={true} idx={idx} key={idx} content={<div><Rank
                                    setUserResult={setUserResult}
                                    rankResultNum={rankResultNum}
                                    rankResult={rankResult}
                                    listSize={list.length}
                                    idx={idx}
                                    hide={false}
                                    list={list[idx]}
                                    correct={correct}
                                    bonusCorrect={bonusCorrect}
                                    trigger={trigger}></Rank>
                                    {list[idx].sort((a, b) => a - b).map((x, idx) =>
                                        <ResultNum key={idx} bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x}></ResultNum>)}</div>
                                }></NumLineWrap>)
                        else {
                            return (
                                <Rank idx={idx} key={idx}
                                    setUserResult={setUserResult}
                                    rankResultNum={rankResultNum}
                                    rankResult={rankResult}
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

    var rankResult = new RankResult()
    var rankResultNum = new RankResultNum()
    return (
        <div>
            <Button id="randomBtn" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="50만원" click={() => randomTest(200)}></Button>
            <Button id="lineAdd" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="100만원" click={() => randomTest(1000)}></Button>
            <Button fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="500만원" click={() => randomTest(5000)}></Button>
            <Button fontSize={"1.0em"} color="rgb(255,94,0)" bg="rgba(255,94,0,.12)" hoverBg="rgb(255,94,0)" content="1000만원" click={() => randomTest(10000)}></Button>
            {draw ? <Draw mode={true} bonusCorrect={bonusCorrect} setbonusCorrect={setbonusCorrect} trigger={trigger} setTrigger={setTrigger} list={list} setDraw={setDraw} setCorrect={setCorrect} correct={correct}></Draw> : ''}
            <LineDiv fontSize={15} content="4등 이상 당첨 번호"></LineDiv>
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

