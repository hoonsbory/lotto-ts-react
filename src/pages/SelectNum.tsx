import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../components/Button';
import { useHistory } from 'react-router-dom'
import ResultNum from '../components/ResultNum';
import LineDiv from '../components/LineDiv';

//ts에서 props를 사용하는 방법
type props = {
    addList: Function
}
interface numSpanProps {
    selected?: boolean
}

//이런 식으로 자주 쓰일 것 같은 css를 만들어놓고 편리하게 사용 가능.
// const hoverForPC = css`
//     &:hover{
//         background : rgb(70, 77, 82);
//         color : white;
//     }
// `
const NumSpan = styled.button<numSpanProps>`
        width : 35px;
        outline : 0;
        cursor : pointer;
        border : 0;
        transition:all ease-out .5s;
        padding : 5px 0px;
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.selected ? "rgb(70, 77, 82)" : "#EAEAEA"};
        color : ${props => props.selected ? "white" : "unset"};
        border-radius : 10px;
        font-weight : 600;
        ${sessionStorage.getItem("mobile")==="true" ? '': '&:hover{font-size : 16px}'}
    `
    //모바일 환경에서 hover는 사용자에게 혼란을 일으킬 수 있기 때문에 PC에만 hover.

const NumDiv = styled.div`
        max-width : 360px;
    `

const SelectNum = ({ addList }: props) => {

    const history = useHistory()

    const [selectBtn, setSelectBtn] = useState<boolean[]>([])
    const [numList,setNumList] = useState<number[]>([])

    let allNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

    //번호 선택 이벤트
    const select = (num: number) => {
        if (numList.includes(num)) {
            //번호 선택 해제. 배열에서 제거하고 스타일 변경을 위해 false로 변경.
            numList.splice(numList.indexOf(num), 1)
            selectBtn[num - 1] = false
            setSelectBtn([...selectBtn])
            setNumList([...numList])
        }
        else if (numList.length === 6) return
        else {
            selectBtn[num - 1] = true
            setSelectBtn([...selectBtn])
            numList.push(num)
            setNumList([...numList])
        }
    }

    let map = allNum.map((x, idx) => <NumSpan selected={selectBtn[idx]} id={`btn${x}`} onClick={() => select(x)}>{x}</NumSpan>)

    const reset = () => {
        setSelectBtn([])
        setNumList([])
    }
    const submit = () => {
        if(numList.length<6){
            alert("총 6개의 번호를 선택해주세요")
            return
        }
        if(window.confirm(`로또번호 ${numList} 를 제출하시겠습니까?`)){
            addList(numList)
            history.push('/result')
        }
    }

    return (
        <div>
            <NumDiv>
                {map}
            </NumDiv>
            <Button color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="초기화" click={reset}></Button>
            <Button color="rgb(86, 115, 235)" bg="rgb(224, 230, 251)" content="번호제출" click={submit}></Button>
            <LineDiv content="내가 뽑은 로또 번호"></LineDiv>
            <p>{numList.map(x => <ResultNum num={x}></ResultNum>)}</p>
        </div>
    )
}

export default SelectNum
