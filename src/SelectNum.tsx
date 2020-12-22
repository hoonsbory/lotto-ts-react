import { useSelector } from 'react-redux';
import { StoreState } from './store'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button';
import { useHistory } from 'react-router-dom'

//ts에서 props를 사용하는 방법
type props = {
    addList: Function
}
interface numSpanProps {
    selected?: boolean
}
const NumSpan = styled.button<numSpanProps>`
        width : 35px;
        border : 0;
        padding : 5px 0px;
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.selected ? "black" : "#EAEAEA"};
        color : ${props => props.selected ? "white" : "black"};
        border-radius : 10px;
        font-weight : 600;
        &:hover{
            background : black;
            color : white;
        }
    `
const NumDiv = styled.div`
        max-width : 360px;
        display : inline-flex;
        flex-flow : wrap;
    `

const SelectNum = ({ addList }: props) => {

    const history = useHistory()

    const [selectBtn, setSelectBtn] = useState<boolean[]>([])
    const [numList,setNumList] = useState<number[]>([])

    let allNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const select = (num: number) => {
        if (numList.includes(num)) {
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
        setSelectBtn([...selectBtn.map<boolean>(x=>{
            if(x) x=false
            return x;
        })])
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
            <Button color="white" bg="blue" content="초기화" click={reset}></Button>
            <Button color="white" bg="red" content="번호제출" click={submit}></Button>
            <p>내가 뽑은 로또 번호 : {numList.sort((a, b) => a - b).map(x => `${x}   `)}</p>
        </div>
    )
}

export default SelectNum
