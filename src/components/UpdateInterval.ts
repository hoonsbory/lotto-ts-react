import { useEffect, useRef } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/ChartStore';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'

const UpdateInterval = () => {

    const {roundSelect1,roundSelect2,recentRound} = useSelector((state: StoreState) => state.ChartReducer)

    const dispatch = useDispatch()

    const setChartList = (value: number[]) => dispatch(actionCreators.setChartList(value))
    
    const setChartBonusList = (value: number[]) => dispatch(actionCreators.setChartBonusList(value))
    
    const setUserSum = (value: any) => dispatch(actionCreators.setUserChartSum(value))
    
    const setUserChartList = (value: number[]) => dispatch(actionCreators.setUserChartList(value))
    

    const setRoundSize = (value: number) => dispatch(actionCreators.setRecentRound(value))
    
    const setRoundSelect2 = (value: number) => dispatch(actionCreators.setRoundSelect2(value))
    
    const setRoundSelect1 = (value: number) => dispatch(actionCreators.setRoundSelect1(value))
    
    //최신 회차가 몇인지 가져옴.
    const getSize = async () => {
        await Axios.post(`${process.env.REACT_APP_URL}/`, {
            query: `
        query{
            roundSize
        }
        `}).then(res => {

                var data = res.data.data.roundSize
                
                getRankData()
                getWinData()

                setRoundSelect2(data)
                setRoundSize(data)
                setRoundSelect1(data - 30)
                document.getElementById("searchLottoSec")!.style.display = "block"

            })
    }

    const winGraph = (skip: number, limit: number, bonus: boolean, sort: boolean) => {
        if (recentRound === 0) return
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
        if (recentRound === 0)
            getSize()
        else {
            //회차정보가져온 후 인터벌 시작
            id.current = setInterval(() => {
                interval()
            }, 15000);
        }
    }, [recentRound])

    const id = useRef<any>()

    useEffect(() => {
        if (recentRound === 0) return
        //실제로또 회차 셀렉트 옵션 변경시 데이터 가져옴
        var [big, small] = bigSmall(roundSelect1, roundSelect2)
        winGraph(small - 1, big - small + 1, false, false)
        winGraph(small - 1, big - small + 1, true, false)

    }, [roundSelect1, roundSelect2])

    function interval() {
        console.log("Data Updated!")
        //실제로또 데이터는 15초주기로 업데이트할 필요가 없기 때문에 유저들 통계 자료만 업데이트.
        getRankData()
        getWinData()
    }
}

export default UpdateInterval
