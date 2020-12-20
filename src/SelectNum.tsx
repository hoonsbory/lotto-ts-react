import { useSelector } from 'react-redux';
import { StoreState } from './store'

type props = {
    addList: Function
}

const SelectNum = ({addList}:props) => {
    const list = useSelector((state: StoreState) => state.reducer.list);

    let allNum:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]

    const select = (num: number) => {
        if(list.includes(num)) {
            document.getElementById(`btn${num}`)!.style.color = "black"
            list.splice(list.indexOf(num),1)
            addList([...list])
        }
        else if(list.length===6) return
        else {
            document.getElementById(`btn${num}`)!.style.color = "blue"
            // setList([...list,num])
            list.push(num)
            addList([...list])
        }
    }

    let map = allNum.map(x=> <span id={`btn${x}`} onClick={()=>select(x)}>{x}     </span>)

    return (
        <div>
            {map}
            <p>내가 뽑은 로또 번호 : {list.sort((a,b)=> a-b).map(x=> `${x}   `)}</p>
        </div>
    )
}

export default SelectNum
