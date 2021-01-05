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


const Section = styled.section`
    ${props => props.theme.sectionCss}
`


const SelectNum = () => {
    var list = useSelector((state: StoreState) => state.Reducer.list);

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
    const [modeBtn, setModeBtn] = useState<boolean[]>([true,false])



  

 


    const modeChange = Debounce((check:boolean) => {
        if(check){
            if(list.length>100) setList([[]])
            setModeBtn([true,false])
            
        }
        else{
            setModeBtn([false,true])
        }
        setDraw(false)
        setTrigger(false)
        setCorrect([])
        setbonusCorrect([])
    },200)

    return (
        <Section>
            <SubTitle content="가상 로또 추첨"></SubTitle>
            <LineDiv content={<ButtonGroup content={["일반모드","스피드모드"]} selected={modeBtn} click={[()=> modeChange(true), ()=> modeChange(false)]}></ButtonGroup>}></LineDiv>
            {modeBtn[0] ? <NotSpeedMode></NotSpeedMode> : <SpeedMode></SpeedMode>}
        </Section>
    )
}

export default SelectNum

