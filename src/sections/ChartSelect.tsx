import { useState } from 'react'
import AccumulateChart from '../components/AccumulateChart'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/store';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import SubTitle from '../components/SubTitle';
import ButtonGroup from '../components/ButtonGroup';
import UserChart from '../components/UserChart';
import styled from 'styled-components'
import { Debounce } from '../Debounce'

const FlexDiv = styled.div`
    display : inline-flex;
    line-height : 1;
    margin-right : 10px;
`
const Section = styled.section`
    ${props => props.theme.sectionCss}
`
const ChartSelect = () => {

    const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

    const addAList = (newList: number[]) => {
        dispatch(actionCreators.accumulateList(newList))
    }
    const resizeOpt = () => {
        dispatch(actionCreators.resizeOpt())
    }
    const graphSizeUp = (size: number) => {
        dispatch(actionCreators.graphSizeUp(size))
    }
    const graphSizeDown = (size: number) => {
        dispatch(actionCreators.graphSizeDown(size))
    }

    var size = useSelector((state: StoreState) => state.Reducer.graphSize);

    const sizeUp = (idx: number) => {
        selected(idx)
        graphSizeUp(size + 400)
        document.body.getElementsByTagName("canvas")[0].style.width = `${size + 400}px`
        resizeOpt()
        

    }
    const sizeDown = (idx: number) => {
        if (size < 361) return
        selected(idx)
        graphSizeDown(size - 400)
        document.body.getElementsByTagName("canvas")[0].style.width = `${size - 400}px`
        resizeOpt()
    }

    const [btnSelect, setBtnSelect] = useState<any[]>([])
    const [graphSelect, setGraphSelect] = useState<any[]>([true, false])

    const selected = Debounce((idx: number) => {
        btnSelect[idx] = true
        setBtnSelect(btnSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }, 200)
    const selected2 = Debounce((idx: number) => {
        addAList([])
        graphSelect[idx] = true
        setGraphSelect(graphSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }, 200)
    return (
        <Section>
            <SubTitle content="로또 분석 그래프"></SubTitle>
            <FlexDiv>
                <ButtonGroup selectBg="rgba(235, 83, 116,.12)" selectColor="rgb(235, 83, 116)" selected={graphSelect} content={["실제 로또 통계", "가상 로또 통계"]} click={[selected2, selected2]}></ButtonGroup>
                <ButtonGroup selected={btnSelect} content={["확대", "축소"]} click={[sizeUp, sizeDown]}></ButtonGroup>
            </FlexDiv>

            {graphSelect[0] ? <AccumulateChart addAList={addAList}></AccumulateChart> : <UserChart addAList={addAList}></UserChart>}

        </Section>
    )
}

export default ChartSelect
