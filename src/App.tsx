import logo from './logo.svg';
import './App.css';
import TsTest from './TsTest';
import SelectNum from './SelectNum';
import { useDispatch } from 'react-redux';
import { actionCreators } from './store/store';


function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const addList = (newList : number[]) => {
    dispatch(actionCreators.list(newList))
  }
  return (
    <div className="App">
      <SelectNum addList={addList}></SelectNum>
      <TsTest testprops={"123"}></TsTest>
    </div>
  );
}

export default App;
