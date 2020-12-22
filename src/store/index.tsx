import { combineReducers } from 'redux';
import { State, Reducer} from './store';

export interface StoreState {
    Reducer: State;
}

export default combineReducers<StoreState>({
    Reducer
});