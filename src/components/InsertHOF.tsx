import { useEffect } from 'react'
import styled from 'styled-components'
import Button from './Button'
//명예의전당 등록 모달
const Modal = styled.div`
    width : 300px;
    background : white;
    box-shadow: rgba(0,0,0,0.28) -1px 1px 20px;
    position: absolute;
    z-index: 998;
    left: 50%;
    transform: translateX(-50%);
    height: 148px;
    border-radius : 10px;
    @media(max-width : 400px){
        width : 80%;
        height : 120px;
    }
`
const Title = styled.h3`
    color : rgb(86,115,235);
    font-weight: 600;
    margin-bottom : 10px;
`
const Content = styled.span`
    color : gray;
    font-size : .8em;
`
const Input = styled.input`
    margin-right : 5px;
    outline : 0;
    border : 0;
    background : rgb(224,230,251);
    font-size : .9em;
    border-bottom : 2px solid rgb(86,115,235);
    width : 70%;

`

const Div = styled.div`
    display : flex;
`

type props ={
    sendResult:Function
    handleChange:any
    rank:number
}
const InsertHOF = ({rank,sendResult,handleChange}:props) => {
    useEffect(() => {
            document.getElementById("nameInput")?.focus()
    }, [])
    const keyEvent = (e:any) => {
        if(e.keyCode===13) sendResult()
    }
    return (
        <Modal>
            <Title>축하합니다!</Title>
            <Content>{rank}등에 당첨되셨습니다. </Content><br></br>
            <Content>명예의 전당에 등록할 닉네임을 입력해주세요.</Content>
            <Input id="nameInput" placeholder="2~15글자" onChange={handleChange} onKeyUp={keyEvent}/>
            <Button bg="rgb(224,230,251)" color="rgb(86,115,235)" content="제출" click={sendResult}></Button>
        </Modal>
    )
}

export default InsertHOF
