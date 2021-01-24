import { combineReducers } from 'redux';
import { State, Reducer } from './FakeLottoStore';
import { ChartState, ChartReducer } from './ChartStore'

export interface StoreState {
    Reducer: State;
    ChartReducer: ChartState; 

}

export default combineReducers<StoreState>({
    Reducer,
    ChartReducer
});