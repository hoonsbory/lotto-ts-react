import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/store';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../components/Button';

import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';

import Draw from './Draw';
import NumList from '../components/NumList';
import NumLineWrap from '../components/NumLineWrap';
import Rank from '../components/Rank';
import DeleteSvg from '../components/DeleteSvg';
import SubTitle from '../components/SubTitle';
import { RankResultNum } from '../models/RankResultNum';
import { RankResult } from '../models/RankResult';

//ts에서 props를 사용하는 방법


//이런 식으로 자주 쓰일 것 같은 css를 만들어놓고 편리하게 사용 가능.
// const hoverForPC = css`
//     &:hover{
//         background : rgb(70, 77, 82);
//         color : white;
//     }
// `
const Section = styled.section`
    ${props => props.theme.sectionCss}
`

const SmallDiv = styled.div`
    color : gray;
    font-size : 12px;
    display : flex;
    flex-direction : column-reverse;
`

const NumDiv = styled.div`
    `
const SelectNum = () => {
    var list = useSelector((state: StoreState) => state.Reducer.list);
    var draw = useSelector((state: StoreState) => state.Reducer.drawCheck);
    var correct = useSelector((state: StoreState) => state.Reducer.corrected);
    var bonusCorrect = useSelector((state: StoreState) => state.Reducer.bonusCorrect);
    var trigger = useSelector((state: StoreState) => state.Reducer.resultTrigger);

    const dispatch = useDispatch();

    const setList = (list: number[][]) => {
        dispatch(actionCreators.list(list))
    }
    const setDraw = (value: boolean) => {
        dispatch(actionCreators.drawCheck(value))
    }
    const setCorrect = (value: boolean[]) => {
        dispatch(actionCreators.corrected(value))
    }
    const setbonusCorrect = (value: boolean[]) => {
        dispatch(actionCreators.bonusCorrect(value))
    }
    const setTrigger = (value: boolean) => {
        dispatch(actionCreators.resultTrigger(value))
    }
    const setUserResult = (value: any) => {
        dispatch(actionCreators.userResult(value))
    }
    const [selectBtn, setSelectBtn] = useState<boolean[]>([])
    const [line, setLine] = useState<number>(0)


    useEffect(() => {
        var result = localStorage.getItem("userResult")
        if(result) setUserResult(JSON.parse(result))
    }, [])

    let allNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

    //번호 선택 이벤트
    const select = (num: number) => {
        if(afterDraw()) return
        if (list[line].includes(num)) {
            //번호 선택 해제. 배열에서 제거하고 스타일 변경을 위해 false로 변경.
            list[line].splice(list[line].indexOf(num), 1)
            selectBtn[num - 1] = false
            setSelectBtn([...selectBtn])
            setList([...list])
        }
        else if (list[line].length === 6) return
        else {
            selectBtn[num - 1] = true
            setSelectBtn([...selectBtn])
            list[line].push(num)
            setList([...list])
        }
    }

   

    let map = allNum.map((x, idx) => <NumList content={x} selected={selectBtn[idx]} id={`btn${x}`} click={select}></NumList>)

    const reset = () => {
        setCorrect([])
        setbonusCorrect([])
        setTrigger(false)
        setDraw(false)
        setLine(0)
        setSelectBtn([])
        setList([[]])
    }
    console.log("aaa")

    const submit = () => {
        if (list[line].length < 6) {
            alert("총 6개의 번호를 선택해주세요")
            return
        }
        if (window.confirm(`선택한 로또번호로 추첨하시겠습니까?`)) {
            setDraw(true)
        }
    }

    const afterDraw = () => {
        if(document.getElementById("resetBtn")?.nextElementSibling?.nextElementSibling?.firstChild?.nodeName==='SPAN'){
            if(window.confirm("추첨이 시작된 로또이므로 번호를 추가할 수 없습니다. 초기화하시겠습니까?")){
                reset()
                return true
            } 
            else return true
        }
        else return false
    }

    const random = () => {
        if(afterDraw()) return
        var length: number = list[line].length
        for (var i = 0; i < 6 - length; i++) {
            while (true) {
                var num: number = Math.floor((Math.random() * 45) + 1)
                if (!list[line].includes(num)) {
                    document.getElementById(`btn${num}`)?.click()
                    break;
                }
            }
        }
    }

    const addLine = () => {
        if (list[line].length < 6) return
        if(afterDraw()) return
        list.push([])
        setList([...list])
        setLine(line + 1)
        setSelectBtn([])
    }

    const resetOneLine = () => {
        list[line] = []
        setSelectBtn([])
        setList([...list])
    }

    const deleteLine = (idx: number) => {
        list.splice(idx, 1)
        setList([...list])
        setLine(line - 1)
    }

    const deleteSelectLine = (idx:number) => {
        if(list.length===idx+1) setSelectBtn([])
        deleteLine(idx)
    }

  

    var rankResult = new RankResult()
    var rankResultNum = new RankResultNum()
    return (
        <Section>
            <SubTitle content="가상 로또 추첨"></SubTitle>
            <NumDiv>
                {map}
            </NumDiv>
            <Button fontSize={"1.1em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="나머지 랜덤" click={random}></Button>
            <Button fontSize={"1.1em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="한 줄 추가" click={addLine}></Button>
            <Button fontSize={"1.1em"} color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="현재 줄 초기화" click={resetOneLine}></Button>
            <Button fontSize={"1.1em"} color="rgb(235, 83, 116)" bg="rgba(235, 83, 116, 0.12)" hoverBg="rgb(235, 83, 116)" content="전체초기화" click={reset}></Button>
            <Button fontSize={"1.1em"} color="rgb(255,94,0)" bg="rgba(255,94,0,.12)" hoverBg="rgb(255,94,0)" content="추첨하기" click={submit}></Button>
            {draw ? <Draw  bonusCorrect={bonusCorrect} setbonusCorrect={setbonusCorrect} trigger={trigger} setTrigger={setTrigger} list={list} setDraw={setDraw} setCorrect={setCorrect} correct={correct}></Draw> : ''}
            <LineDiv fontSize={15} content="내가 뽑은 로또 번호"></LineDiv>
            <div>
                {list.map((i, idx) => <NumLineWrap content={list[idx].length === 0 ? (list.length > 1 ? <SmallDiv>새 번호를 선택해주세요<Button   hoverBg="#EAEAEA"  bg="none" content={<DeleteSvg></DeleteSvg>} click={() => deleteSelectLine(idx)}></Button></SmallDiv> :<SmallDiv>새 번호를 선택해주세요</SmallDiv>) 

                : <div><Rank setUserResult={setUserResult} rankResultNum={rankResultNum}  rankResult={rankResult} listSize={list.length} idx={idx}  list={list[idx]} correct={correct} bonusCorrect={bonusCorrect} trigger={trigger}></Rank> 

                {list[idx].sort((a,b)=> a-b).map(x => <ResultNum bonusCorrect={bonusCorrect[x]} correct={correct[x]} num={x}></ResultNum>)}

                {idx > 0 ? <Button  float="right" hoverBg="#EAEAEA"  bg="none" content={<DeleteSvg></DeleteSvg>} click={() => deleteSelectLine(idx)}></Button> : ''}</div>}></NumLineWrap>)}
            </div>
        </Section>
    )
}

export default SelectNum

