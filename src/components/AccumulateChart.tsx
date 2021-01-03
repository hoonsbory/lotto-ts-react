import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import Axios from 'axios'
import Chart from './Chart'
import ButtonGroup from './ButtonGroup';
import styled from 'styled-components'
import LineDiv from './LineDiv';
import { Debounce } from '../Debounce'
import Arrow from './Arrow';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/store';


type props = {
    addAList: Function
}

const FlexDiv = styled.div`
    display : inline-flex;
    line-height : 1;
    margin-right : 10px;
`

const Span = styled.span`
    font-size : .8em;
    color : gray;
    margin-right : 10px;
    margin-top : 7px;
    font-weight : 600;
`
const AccumulateChart = ({ addAList }: props) => {

    //로또 회차정보
    const roundSize = useSelector((state: StoreState) => state.Reducer.recentRound)
    const select1 = useSelector((state:StoreState) => state.Reducer.roundSelect1)
    const select2 = useSelector((state:StoreState) => state.Reducer.roundSelect2)

    const dispatch = useDispatch()

    const setSelect1 = (value:number) => {
        dispatch(actionCreators.roundSelect1(value))
    }
    const setSelect2 = (value:number) => {
        dispatch(actionCreators.roundSelect2(value))
    }

    const winGraph = (skip: number, limit: number, bonus: boolean, sort: boolean) => {
        if (roundSize === 0) return
        Axios.post('http://192.168.35.117:7000/winGraph', { skip: skip, limit: limit !== 0 ? limit : 1, bonus: bonus, sort: sort })
            .then(res => {
                addAList(res.data)
            })
    }


    useEffect(() => {
        //처음 그래프 정보 로드
        var [big, small] = bigSmall(select1, select2)
        winGraph(small - 1, big - small + 1, false, false)
    }, [roundSize])

    //버튼 토글 
    const [btnSelect, setBtnSelect] = useState<boolean[]>([true, false])
    //sort버튼 토글
    const [sortBtn, setSortBtn] = useState<boolean>(false)

    //버튼 클릭 이벤트
    const selected = (idx: number) => {
        setBtnSelect(btnSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }

    //최신회차까지 옵션 생성 1회차부터기때문에 +1
    var arr = new Array(roundSize).fill(0)
    var map = arr.map((x, idx: number) => <option key={idx} value={idx + 1}>{idx + 1}</option>)


    //회차 선택을 큰 수, 작은 수 순으로 할 경우를 위해 만든 대소 비교 함수.
    const bigSmall = (val1: number, val2: number) => {
        return val1 > val2 ? [val1, val2] : [val2, val1]
    }

    //옵션1 이벤트
    const handleChange = (e: any) => {
        var val: number = parseInt(e.target.value)

        var [big, small] = bigSmall(val, select2)
        setSelect1(val)
        winGraph(small - 1, big - small + 1, btnSelect[1], sortBtn)
    }

    //옵션2 이벤트
    const handleChange2 = (e: any) => {
        var val: number = parseInt(e.target.value)
        var [big, small] = bigSmall(val, select1)
        setSelect2(val)
        winGraph(small - 1, big - small + 1, btnSelect[1], sortBtn)
    }

    //보너스 미포함 그래프
    const noBonus = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        selected(idx)
        var [big, small] = bigSmall(select2, select1)
        winGraph(small - 1, big - small + 1, false, sortBtn)
    }, 200)

    //보너스 포함 그래프
    const bonus = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        selected(idx)
        var [big, small] = bigSmall(select2, select1)
        winGraph(small - 1, big - small + 1, true, sortBtn)
    }, 200)


    //정렬
    const sort = Debounce(() => {
        var [big, small] = bigSmall(select2, select1)
        if (sortBtn) {
            winGraph(small - 1, big - small + 1, btnSelect[1], false)
            setSortBtn(false)
        } else {
            winGraph(small - 1, big - small + 1, btnSelect[1], true)
            setSortBtn(true)
        }
    }, 200)


    return (
        <div>
            <LineDiv content={<div>
                <select value={select1} onChange={handleChange}>
                    {map}
                </select>  회차부터&nbsp;&nbsp;
            <select value={select2} onChange={handleChange2}>
                    {map}
                </select>  회차까지
            </div>}></LineDiv>

            <FlexDiv><Span>가장 많이 뽑힌</Span><ButtonGroup selected={btnSelect} content={["번호(보너스X)", "보너스번호"]} click={[noBonus, bonus]}></ButtonGroup><Button border={true} click={sort} hoverBg="rgb(224,230,251)" bg="white" content={<Arrow fill="rgb(86,115,235)" upDown={sortBtn}></Arrow>}></Button></FlexDiv>
            
            <Chart></Chart>
        </div>
    )
}

export default AccumulateChart
