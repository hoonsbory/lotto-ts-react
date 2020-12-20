import { combineReducers } from 'redux';
import { State, Reducer as reducer } from './store';

export interface StoreState {
    reducer: State;
}

export default combineReducers<StoreState>({
    reducer
});