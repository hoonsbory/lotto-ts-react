import logo from './logo.svg';
import './App.css';
import TsTest from './TsTest';
import SelectNum from './SelectNum';
import { useDispatch } from 'react-redux';
import { actionCreators } from './store/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react'


function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const addList = (newList: number[]) => {
    dispatch(actionCreators.list(newList))
  }
  const [a, setA] = useState<number>(123)
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path='/hoonsbory/lotto-ts-react' render={()=> <SelectNum addList={addList}></SelectNum>}></Route>
          <Route path='/hoonsbory/lotto-ts-react/result' component={TsTest}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
