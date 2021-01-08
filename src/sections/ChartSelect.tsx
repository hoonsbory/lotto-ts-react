import { useState } from 'react'
import AccumulateChart from '../components/AccumulateChart'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/ChartStore';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import SubTitle from '../components/SubTitle';
import ButtonGroup from '../components/ButtonGroup';
import UserChart from '../components/UserChart';
import styled from 'styled-components'
import { Debounce } from '../Debounce'
//실제 로또 통계와 가상로또 통계를 담고 있는 섹션
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

    //공통으로 쓰일 리스트 액션
    const addAList = (newList: number[]) => {
        dispatch(actionCreators.chartList(newList))
    }
    //차트 사이즈업 액션
    const graphSizeUp = (size: number) => {
        dispatch(actionCreators.graphSizeUp(size))
    }
    //차트 사이즈다운 액션
    const graphSizeDown = (size: number) => {
        dispatch(actionCreators.graphSizeDown(size))
    }
    
    const setMainList = (value:any) => {
        dispatch(actionCreators.chartMainData(value))
    }
    //차트 사이즈
    var size = useSelector((state: StoreState) => state.Reducer.graphSize);

    //차트 사이즈업
    const sizeUp = (idx: number) => {
        btnStateChange(idx)
        graphSizeUp(size + 400)
        document.getElementById("myChart")!.style.width = `${size + 400}px`
    }

    //차트 사이즈다운
    const sizeDown = (idx: number) => {
        if (size < 361) return
        btnStateChange(idx)
        graphSizeDown(size - 400)
        document.getElementById("myChart")!.style.width = `${size - 400}px`
    }

    //토글 버튼
    const [btnSelect, setBtnSelect] = useState<any[]>([])
    const [graphSelect, setGraphSelect] = useState<any[]>([true, false])

    //버튼 그룹이 3개이상일 때를 대비해서 반복을 통해 선택된 버튼만 true로 만듦. 근데 버튼을 두개씩만 써서 사실 필요없음 ...
    const btnStateChange = Debounce((idx: number) => {
        btnSelect[idx] = true
        setBtnSelect(btnSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }, 200)

    //차트 전환
    const selected2 = Debounce((idx: number) => {
        setMainList([]) //값을 초기화하지 않고 그래프를 바꾸면 이전 값의 잔상이 남는다.
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
                <ButtonGroup id={["graphBtn1","graphBtn2"]} selectBg="rgba(235, 83, 116,.12)" selectColor="rgb(235, 83, 116)" selected={graphSelect} content={["실제 로또 통계", "가상 로또 통계"]} click={[selected2, selected2]}></ButtonGroup>
                <ButtonGroup id={["sizeUpBtn","sizeDownBtn"]} selected={btnSelect} content={["확대", "축소"]} click={[sizeUp, sizeDown]}></ButtonGroup>
            </FlexDiv>

            {graphSelect[0] ? <AccumulateChart/>: <UserChart/>}

        </Section>
    )
}

export default ChartSelect
