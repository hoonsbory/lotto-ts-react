import { useEffect, useRef } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/ChartStore';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { RankResult } from '../models/RankResult';

const UpdateInterval = () => {
    const roundSize = useSelector((state: StoreState) => state.Reducer.recentRound)
    const select1 = useSelector((state: StoreState) => state.Reducer.roundSelect1)
    const select2 = useSelector((state: StoreState) => state.Reducer.roundSelect2)

    const dispatch = useDispatch()

    const setChartList = (value: number[]) => {
        dispatch(actionCreators.chartList(value))
    }
    const setChartBonusList = (value: number[]) => {
        dispatch(actionCreators.chartBonusList(value))
    }
    const setUserSum = (value: any) => {
        dispatch(actionCreators.userChartSum(value))
    }
    const setUserChartList = (value: number[]) => {
        dispatch(actionCreators.userChartList(value))
    }

    const setRoundSize = (value: number) => {
        dispatch(actionCreators.recentRound(value))
    }
    const setRoundSelect2 = (value: number) => {
        dispatch(actionCreators.roundSelect2(value))
    }
    const setRoundSelect1 = (value: number) => {
        dispatch(actionCreators.roundSelect1(value))
    }
    //최신 회차가 몇인지 가져옴.
    const getSize = async () => {
        await Axios.post(`${process.env.REACT_APP_URL}/`, {
            query: `
        query{
            roundSize
        }
        `}).then(res => {
                var data = res.data.data.roundSize
                setRoundSelect2(data)
                setRoundSelect1(data - 30)
                setRoundSize(data)
                document.getElementById("root")!.style.display = "block"

            })
    }

    const winGraph = (skip: number, limit: number, bonus: boolean, sort: boolean) => {
        if (roundSize === 0) return
        Axios.post(`${process.env.REACT_APP_URL}/winGraph`, { skip: skip, limit: limit !== 0 ? limit : 1, bonus: bonus, sort: sort })
            .then(res => {
                if (!bonus) {
                    setChartList(res.data)
                }
                else {
                    setChartBonusList(res.data)
                }
            })
    }

    const getRankData = async () => {
        Axios.post(`${process.env.REACT_APP_URL}/`, {
            query: `
        query{
            resultSum(_id:"id"){
                last fifth fourth third second first
            }
        }
        `}).then(res => {
                var data = res.data.data.resultSum
                var list = Object.keys(data).map(i => {
                    switch (i) {
                        case "first":
                            return ["1등", data[i]]
                        case "second":
                            return ["2등", data[i]]
                        case "third":
                            return ["3등", data[i]]
                        case "fourth":
                            return ["4등", data[i]]
                        case "fifth":
                            return ["5등", data[i]]
                        case "last":
                            return ["꽝", data[i]]
                        default:
                            break;
                    }
                })
                setUserSum(list)
            })
    }

    const getWinData = async () => {
        Axios.get(`${process.env.REACT_APP_URL}/userWinNum`).then(res => {
            setUserChartList(res.data)
        })
    }



    //회차 선택을 큰 수, 작은 수 순으로 할 경우를 위해 만든 대소 비교 함수.
    const bigSmall = (val1: number, val2: number) => {
        return val1 > val2 ? [val1, val2] : [val2, val1]
    }

    useEffect(() => {
        //처음 그래프 정보 로드
        getSize()
        if(roundSize===0) return
        var [big, small] = bigSmall(select1, select2)
        winGraph(small - 1, big - small + 1, false, false)
        winGraph(small - 1, big - small + 1, true, false)
        getRankData()
        console.log(1)
        getWinData()
    }, [roundSize])

    const id = useRef<any>()

    useEffect(() => {
        if(roundSize===0) return
        if(id) clearInterval(id.current)
        interval() //유저가 회차 셀렉트 시 즉각적으로 정보가져오고 다시 인터벌 시작
        id.current = setInterval(() => {
            interval()
        }, 15000);
    }, [select1,select2])

    function interval() {
        var [big, small] = bigSmall(select1, select2)
        winGraph(small - 1, big - small + 1, false, false)
        winGraph(small - 1, big - small + 1, true, false)
        getRankData()
        getWinData()
    }
}

export default UpdateInterval
