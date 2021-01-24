import { useEffect , useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/FakeLottoStore';
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import LineDiv from '../components/LineDiv'
import Axios from 'axios'
import ResultNum from '../components/ResultNum';
import styled from 'styled-components'
//가장 상단에 위치한 섹션
//처음에 로드되기때문에 로또의 회차 수를 가져오고 가장 최신회차의 번호를 출력한다.
const Div = styled.div`
    margin-bottom : 30px;
    display : none;
    animation: ${props => props.theme.fadeUp2} .4s linear alternate;
`
const Select = styled.select`
    border-radius : 5px;
    outline : 0;
    background : none;
    font-size : .9em;
`
const SearchLotto = () => {
    const [select,setSelect] = useState<number>(0)
    const [numList,setNumList] = useState<number[]>([])


    //회차
    var roundSize = useSelector((state:StoreState)=> state.ChartReducer.recentRound)

  

    //선택한 회차 정보를 가져옴
    const getNum = async (num : number) => {
        await Axios.post(`${process.env.REACT_APP_URL}/`, {query : `
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
        //회차정보는 하단에 차트에서도 쓰이기때문에 처음에 가져와서 state로 관리한다.
        if(roundSize>0){
            setSelect(roundSize)
            getNum(roundSize)
        }
    }, [roundSize])

    //select 옵션 최신회차까지 생성
    var arr = new Array(roundSize).fill(0)
    var map = arr.map((x, idx: number) => <option key={idx} value={idx + 1}>{idx + 1}</option>)


    //select onChange
    const handleChange = (e:any) => {
        setSelect(e.target.value)
        getNum(e.target.value)
    }

    return (
        <Div id="searchLottoSec">
            <LineDiv  content={<div>지난 로또 조회  <Select value={select} onChange={handleChange}>{map}</Select>회차</div>}></LineDiv>
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
