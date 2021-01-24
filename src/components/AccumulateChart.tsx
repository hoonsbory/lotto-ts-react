import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Chart from './Chart'
import ButtonGroup from './ButtonGroup';
import styled from 'styled-components'
import LineDiv from './LineDiv';
import { Debounce } from '../Debounce'
import Arrow from './Arrow';
import Button from './Button';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/ChartStore';
import LoadingSvg from './LoadingSvg';
//실제 로또 통계 차트 선택 섹션


const FlexDiv = styled.div`
    display : inline-flex;
    line-height : 1;
    margin-right : 10px;
`

const Span = styled.span`
    font-size : .8em;
    color : gray;
    margin-right : 10px;
    margin-top : 10px;
    font-weight : 600;
    white-space: nowrap;
`
const Select = styled.select`
    border-radius : 5px;
    outline : 0;
    background : none;
    font-size : .9em;
`
const LoadingDiv = styled.div`
    padding : 100px;
    border : 1px solid gray;
`


const AccumulateChart = () => {

    //로또 회차정보
    
    const {sortBtn,chartBonusList,chartList,chartMainData,roundSelect1,roundSelect2,recentRound} =  useSelector((state: StoreState) => state.ChartReducer)

    const dispatch = useDispatch()

    const setSelect1 = (value: number) => dispatch(actionCreators.setRoundSelect1(value))
    
    const setSelect2 = (value: number) => dispatch(actionCreators.setRoundSelect2(value))
    
    const setMainList = (value: any) => dispatch(actionCreators.setChartMainData(value))
    
    const setSortBtn = () => dispatch(actionCreators.setSortBtn())
    



    useEffect(() => {
        if (btnSelect[0]) {
            if (sortBtn) {
                setMainList([...chartList.sort((a: any, b: any) => a[1] - b[1])])
            }
            else {
                setMainList([...chartList.sort((a: any, b: any) => b[1] - a[1])])
            }
        }
        else {
            if (sortBtn) {
                setMainList([...chartBonusList.sort((a: any, b: any) => a[1] - b[1])])
            }
            else
                setMainList([...chartBonusList.sort((a: any, b: any) => b[1] - a[1])])
        }
    }, [chartList])


    //버튼 토글 
    const [btnSelect, setBtnSelect] = useState<boolean[]>([true, false])
    //sort버튼 토글

    //버튼 클릭 이벤트
    const selected = (idx: number) => {
        setBtnSelect(btnSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }

    //최신회차까지 옵션 생성 1회차부터기때문에 +1
    var arr = new Array(recentRound).fill(0)
    var map = arr.map((x, idx: number) => <option key={idx} value={idx + 1}>{idx + 1}</option>)



    //옵션1 이벤트
    const handleChange = (e: any) => {
        var val: number = parseInt(e.target.value)
        setSelect1(val)
    }

    //옵션2 이벤트
    const handleChange2 = (e: any) => {
        var val: number = parseInt(e.target.value)
        setSelect2(val)
    }

    //보너스 미포함 그래프
    const noBonus = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        selected(idx)
        if (sortBtn)
            setMainList([...chartList.sort((a: any, b: any) => a[1] - b[1])])
        else
            setMainList([...chartList.sort((a: any, b: any) => b[1] - a[1])])
    }, 200)

    //보너스 포함 그래프
    const bonus = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        selected(idx)
        if (sortBtn)
            setMainList([...chartBonusList.sort((a: any, b: any) => a[1] - b[1])])
        else
            setMainList([...chartBonusList.sort((a: any, b: any) => b[1] - a[1])])
    }, 200)


    //정렬
    const sort = Debounce(() => {
        if (sortBtn) {
            setSortBtn()
            setMainList([...chartMainData.sort((a: any, b: any) => b[1] - a[1])])
        } else {
            setSortBtn()
            setMainList([...chartMainData.sort((a: any, b: any) => a[1] - b[1])])
        }
    }, 200)


    return (
        <div>
            <LineDiv content={<div>
                <Select value={roundSelect1} onChange={handleChange}>
                    {map}
                </Select>  회차부터&nbsp;&nbsp;
            <Select value={roundSelect2} onChange={handleChange2}>
                    {map}
                </Select>  회차까지
            </div>}></LineDiv>

            <FlexDiv><Span>가장 많이 뽑힌</Span><ButtonGroup id={["chartBtn1", "chartBtn2"]} selected={btnSelect} content={["번호(보너스X)", "보너스번호"]} click={[noBonus, bonus]}></ButtonGroup><Button border={true} click={sort} hoverBg="rgb(224,230,251)" bg="white" content={<Arrow fill="rgb(86,115,235)" upDown={sortBtn}></Arrow>}></Button></FlexDiv>

            {chartMainData.length>0 ? <Chart></Chart> : <LoadingDiv><LoadingSvg></LoadingSvg>차트를 불러오고 있습니다.</LoadingDiv>}
        </div>
    )
}

export default AccumulateChart

