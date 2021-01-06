import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/store';
import React, { useState } from 'react'
import styled from 'styled-components'
import LineDiv from '../components/LineDiv';
import { Debounce } from '../Debounce'
import SubTitle from '../components/SubTitle';
import NotSpeedMode from '../components/NotSpeedMode';
import SpeedMode from '../components/SpeedMode';
import ButtonGroup from '../components/ButtonGroup';
//가상로또 섹션
//스피드모드와 일반 모드

const Section = styled.section`
    ${props => props.theme.sectionCss}
`


const FakeLotto = () => {
    //번호 리스트 
    var list = useSelector((state: StoreState) => state.Reducer.list);
    //추첨기 온오프
    var draw = useSelector((state: StoreState) => state.Reducer.drawCheck);
    //1~45까지 당첨된 번호  Boolean배열
    var correct = useSelector((state: StoreState) => state.Reducer.corrected);
    //1~45까지 당첨된 보너스 번호 Boolean배열
    var bonusCorrect = useSelector((state: StoreState) => state.Reducer.bonusCorrect);
    //추첨이 완료되고 계산에 들어가게 하는 트리거
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
    //토글 버튼
    const [modeBtn, setModeBtn] = useState<boolean[]>([true,false])



  

 


    const modeChange = Debounce((check:boolean) => {
        setTrigger(false)
        if(check){ //스피드모드로 변경 후 추첨을 안하고 다시 일반모드로 올 때 리스트 남겨둠. 
            if(list.length>100) setList([[]])
            setModeBtn([true,false])
            
        }
        else{
            setModeBtn([false,true])
        }
        setDraw(false)
        setCorrect([])
        setbonusCorrect([])
    },200)

    return (
        <Section>
            <SubTitle content="가상 로또 추첨"></SubTitle>
            <LineDiv content={<ButtonGroup content={["일반모드","스피드모드"]} selected={modeBtn} click={[()=> modeChange(true), ()=> modeChange(false)]}></ButtonGroup>}></LineDiv>
            {modeBtn[0] ? <NotSpeedMode list={list} draw={draw} correct={correct} bonusCorrect={bonusCorrect} trigger={trigger} setList={setList} setDraw={setDraw} setCorrect={setCorrect} setbonusCorrect={setbonusCorrect} setTrigger={setTrigger} setUserResult={setUserResult}></NotSpeedMode> : <SpeedMode list={list} draw={draw} correct={correct} bonusCorrect={bonusCorrect} trigger={trigger} setList={setList} setDraw={setDraw} setCorrect={setCorrect} setbonusCorrect={setbonusCorrect} setTrigger={setTrigger} setUserResult={setUserResult}></SpeedMode>}
        </Section>
    )
}

export default FakeLotto

