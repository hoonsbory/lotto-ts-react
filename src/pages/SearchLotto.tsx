import { useEffect , useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/store';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import LineDiv from '../components/LineDiv'
import Axios from 'axios'
import ResultNum from '../components/ResultNum';
import styled from 'styled-components'

const Div = styled.div`
    margin-bottom : 30px;
`

const SearchLotto = () => {
    const [select,setSelect] = useState<number>(0)
    const [numList,setNumList] = useState<number[]>([])

    const dispatch = useDispatch()

    const setRoundSize = (value:number) => {
        dispatch(actionCreators.recentRound(value))
    }
    const setRoundSelect2 = (value:number) => {
        dispatch(actionCreators.roundSelect2(value))
    }
    const setRoundSelect1 = (value:number) => {
        dispatch(actionCreators.roundSelect1(value))
    }
    var roundSize = useSelector((state:StoreState)=> state.Reducer.recentRound)

    const getSize = async () => {
        await Axios.post('https://lotto-server-mongo.herokuapp.com/', {query : `
        query{
            roundSize
        }
        `}).then(res => {
            var data = res.data.data.roundSize
            setSelect(data)
            setRoundSelect2(data)
            setRoundSelect1(data-30)
            setRoundSize(data)
            document.getElementById("root")!.style.display = "block"
            getNum(data)

        })
    }


    const getNum = async (num : number) => {
        await Axios.post('https://lotto-server-mongo.herokuapp.com/', {query : `
            query{
                winningNum(_id: ${num}){
                    num1 num2 num3 num4 num5 num6 bonus
                }
            }
        `}).then(res=> {
            var obj = res.data.data.winningNum
            var list = []
            for(var data in obj){
                list.push(obj[data])
            }
            setNumList([...list])
        })
    }


    useEffect(() => {
        getSize()
    }, [])

    var arr = new Array(roundSize).fill(0)
    var map = arr.map((x, idx: number) => <option key={idx} value={idx + 1}>{idx + 1}</option>)


    const handleChange = (e:any) => {
        setSelect(e.target.value)
        getNum(e.target.value)
    }

    return (
        <Div>
            <LineDiv fontSize={15} content={<div>지난 로또 조회  <select value={select} onChange={handleChange}>{map}</select>회차</div>}></LineDiv>
            <p>{numList.map((x, idx) => {
                if (idx === 6)
                    return (
                        <span key={idx}>+  <ResultNum key={idx} bonus={true} num={x}></ResultNum></span>
                    )
                else
                    return (
                        <ResultNum key={idx} num={x}></ResultNum>
                    )
            })}</p>
        </Div>
    )
}

export default SearchLotto
