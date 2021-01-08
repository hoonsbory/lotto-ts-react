
import React, { useState, useEffect , useRef} from 'react'
import styled from 'styled-components'
import Button from '../components/Button';
import { List } from 'react-virtualized';
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';

import Draw from '../sections/Draw';
import NumList from '../components/NumList';
import NumLineWrap from '../components/NumLineWrap';
import Rank from '../components/Rank';
import DeleteSvg from '../components/DeleteSvg';
import { RankResultNum } from '../models/RankResultNum';
import { RankResult } from '../models/RankResult';

//번호 리스트 스크롤 
const ScrollList = styled.div`
    overflow-y : auto;
    max-height : ${window.innerHeight / 2}px;
`
const ListIdxSpan = styled.span`
    float : left;
    margin-left : 10px;
    font-weight : 600;
    font-size : .9em;
    margin-top : 4px;
`

const SmallSpan = styled.span`
    color : gray;
    font-size : 12px;
    display : flex;
    flex-direction : column-reverse;
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

const NotSpeedMode = ({ list, draw, correct, bonusCorrect, trigger, setList, setUserResult, setDraw, setTrigger, setCorrect, setbonusCorrect }: props) => {
    //번호 선택 배열. 당첨번호 선택번호 등 state로 관리하는 이유는 스타일 컴포넌트의 props 변경을 위해서다.
    const [selectBtn, setSelectBtn] = useState<boolean[]>([])

    useEffect(() => {
        //로컬스토리지에 있는 유저의 로또 내역 state에 저장
        var result = localStorage.getItem("userResult")
        if (result) setUserResult(JSON.parse(result))
    }, [])
    //번호 선택 이벤트
    const select = (num: number) => {
        if (limit()) return
        if (list[list.length - 1].includes(num)) {
            //번호 선택 해제. 배열에서 제거하고 스타일 변경을 위해 false로 변경.
            list[list.length - 1].splice(list[list.length - 1].indexOf(num), 1)
            selectBtn[num - 1] = false
            setSelectBtn([...selectBtn])
            setList([...list])
        }
        else if (list[list.length - 1].length === 6) return
        else {
            selectBtn[num - 1] = true
            setSelectBtn([...selectBtn])
            list[list.length - 1].push(num)
            setList([...list])
        }
    }


    //로또 번호 버튼배열 생성
    let allNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    let map = allNum.map((x, idx) => <NumList key={idx} content={x} selected={selectBtn[idx]} id={`btn${x}`} click={select}></NumList>)







    //전체 상태 초기화
    const reset = () => {
        setCorrect([])
        setbonusCorrect([])
        setTrigger(false)
        setDraw(false)
        setSelectBtn([])
        setList([[]])
    }

    //번호 확정 시 추첨기 ON
    const submit = () => {
        if (list[list.length - 1].length < 6) {
            alert("총 6개의 번호를 선택해주세요")
            return
        }
        if (window.confirm(`선택한 로또번호로 추첨하시겠습니까?`)) {
            setDraw(true)
        }
    }

    //추첨 후에 버튼 조작 못하게
    const afterDraw = () => {
        if (document.getElementById('resetBtn')&&!document.getElementById("beforeDrawNotice")) {
            if (window.confirm("추첨이 시작된 로또이므로 번호를 추가할 수 없습니다. 초기화하시겠습니까?")) {
                reset()
                return true
            }
            else return true
        }
        else return false
    }

    //최대 100장까지 구매제한
    const limit = () => {
        if (afterDraw()) return true
        var count: any = document.getElementById("lottoList")?.childElementCount
        if (count > 100) {
            alert("1회 10만원까지만 제공됩니다.")
            return true
        }
        return false
    }


    //랜덤뽑기. 번호 선택 6개까지 남은 n개의 수를 랜덤으로 클릭. true를 파라미터로 10회 뽑기 여부 판단
    const random = (tenReps: boolean) => {
        if (limit()) return
        var length: number = list[list.length - 1].length
        for (var i = 0; i < 6 - length; i++) {
            while (true) {
                var num: number = Math.floor((Math.random() * 45) + 1)
                if (!list[list.length - 1].includes(num)) {
                    document.getElementById(`btn${num}`)?.click()
                    break;
                }
            }
        }
        //랜덤 10회 뽑기 최대 100회까지 제한.
        if (tenReps) {
            var count: any = document.getElementById("lottoList")?.childElementCount
            if (count > 99) {
                alert("1회 10만원까지만 제공됩니다.")
                return
            }
            document.getElementById("loadingBg")!.style.display = "block";
            if (count + 10 > 100)
                random11(100)
            else
                random11(count < 10 ? count + 9 : count + 10)
        }
    }

    const random11 = (count: number) => {
        if (document.getElementById("lottoList")?.childElementCount === count) {
            document.getElementById("loadingBg")!.style.display = "none";
            return
        }
        document.getElementById("lineAdd")?.click()
        setTimeout(() => {
            document.getElementById(`randomBtn`)?.click()
            random11(count)
        }, 1);

    }



    //로또 한줄 추가
    const addLine = () => {
        if (list[list.length - 1].length < 6) return
        if (limit()) return
        list.push([])
        setList([...list])
        setSelectBtn([])
        var node: any = document.getElementById("lottoList")
        setTimeout(() => {
            node.scrollTo(0, node.clientHeight + 10000)
        }, 10);
    }

    //한줄 초기화. 줄 자체를 제거하지는 않고 선택번호만 초기화
    const resetOneLine = () => {
        list[list.length - 1] = []
        setSelectBtn([])
        setList([...list])
    }

    //줄 삭제
    const deleteSelectLine = (idx: number) => {
        if (list.length === idx + 1) setSelectBtn([])
        deleteLine(idx)
    }

    const deleteLine = (idx: number) => {
        list.splice(idx, 1)
        setList([...list])
    }


    //react virtualized 
    const rowRenderer = (
        () => {
            return (
                <ScrollList id="lottoList">
                    {list.map((i, idx) => <NumLineWrap key={idx} idx={idx} content={list[idx].length === 0 ?
                        (list.length > 1 ? //2개이상부터는 삭제가능하게 Btn추가
                            <SmallSpan>새 번호를 선택해주세요
                             <Button
                                    hoverBg="#EAEAEA"
                                    bg="none"
                                    content={<DeleteSvg />}
                                    click={() => deleteSelectLine(idx)} />
                            </SmallSpan>
                            : <SmallSpan >새 번호를 선택해주세요</SmallSpan>)

                        : <span>{trigger ? //추첨 끝나면 Rank계산
                            <Rank
                                setUserResult={setUserResult}
                                rankResultNum={rankResultNum.current}
                                rankResult={rankResult.current}
                                listSize={list.length}
                                idx={idx}
                                list={list[idx]}
                                correct={correct}
                                bonusCorrect={bonusCorrect}
                                trigger={trigger} /> : ''}

                            <ListIdxSpan>{idx + 1}번</ListIdxSpan>
                            {list[idx].sort((a, b) => a - b).map((x, idx2) =>
                                //번호 6개
                                <ResultNum key={idx2} bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x} />)}

                            {idx > 0 ?
                                <Button float="right" hoverBg="#EAEAEA" bg="none" content={<DeleteSvg />} click={() => deleteSelectLine(idx)} />
                                : ''}</span>} />)}
                </ScrollList>
            );
        })

    //계산에 쓰일 클래스 
    var rankResult = useRef(new RankResult())
    var rankResultNum = useRef(new RankResultNum())
    return (
        <div>
            {map}
            <div>
            <Button id="randomBtn" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="나머지 랜덤" click={() => random(false)} />
            <Button id="lineAdd" fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="한 줄 추가" click={addLine} />
            <Button fontSize={"1.0em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="현재 줄 초기화" click={resetOneLine} />
            </div>
            <Button fontSize={"1.0em"} color="rgb(235, 83, 116)" bg="rgba(235, 83, 116, 0.12)" hoverBg="rgb(235, 83, 116)" content="전체초기화" click={reset} />
            <Button fontSize={"1.0em"} color="rgb(255,94,0)" bg="rgba(255,94,0,.12)" hoverBg="rgb(255,94,0)" content="만원 어치" click={() => random(true)} />
            <Button fontSize={"1.0em"} color="rgb(255,94,0)" bg="rgba(255,94,0,.12)" hoverBg="rgb(255,94,0)" content="추첨하기" click={submit} />
            {draw ? <Draw mode={false} bonusCorrect={bonusCorrect} setbonusCorrect={setbonusCorrect} trigger={trigger} setTrigger={setTrigger} list={list} setDraw={setDraw} setCorrect={setCorrect} correct={correct} /> : ''}
            <LineDiv fontSize={15} content="내가 뽑은 로또 번호" />
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
            />
        </div>
    )
}

export default NotSpeedMode