import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Chart from './Chart'
import ButtonGroup from './ButtonGroup';
import styled from 'styled-components'
import LineDiv from './LineDiv';
import { Debounce } from '../Debounce'
import PieChart from './LineChart';
import { RankResult } from '../models/RankResult';
//유저들의 로또 결과를 보여주는 그래프
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
    word-break : keep-all;
`

const UserChart = ({addAList}:props) => {


    const getRankData = async () => {
        Axios.post(`${process.env.REACT_APP_URL}/`, {query : `
        query{
            resultSum(_id:"id"){
                first second third fourth fifth last
            }
        }
        `}).then(res => {
            setRankList(new RankResult(res.data.data.resultSum))
        })
    }

    const getWinData = async () => {
        Axios.get(`${process.env.REACT_APP_URL}/userWinNum`).then(res => {
            addAList(res.data)
        })
    }


    useEffect(() => {
        //디폴트 차트인 rankdata 가져옴
        getRankData()
    }, [])

    //버튼 토글 
    const [btnSelect, setBtnSelect] = useState<boolean[]>([true, false])
    const [rankList,setRankList] = useState<RankResult>()

    //버튼 클릭 이벤트
    const selected = (idx: number) => {
        btnSelect[idx] = true
        setBtnSelect(btnSelect.map((i, idx2) => {
            if (idx2 === idx) return true
            else return false;
        }))
    }

   

  

   

    const rankChart = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        getRankData()
        selected(idx)
    }, 200)

    const winNumChart = Debounce((idx: number) => {
        if (btnSelect[idx]) return
        getWinData()
        selected(idx)
    }, 200)


    


    return (
        <div>
            

            <LineDiv content={<FlexDiv><Span>유저들의 가상 로또</Span><ButtonGroup content={["당첨 비율", "당첨 번호(3등 이상)"]} selected={btnSelect} click={[rankChart,winNumChart]}></ButtonGroup></FlexDiv>}></LineDiv>
            
            {btnSelect[0] ? <PieChart rankList={rankList}></PieChart> : <Chart></Chart>}
        </div>
    )
}

export default UserChart
