// types

export interface State {
  list: number[];
  list2: number[]
}

export const LIST = "LIST";
export const LIST2 = "LIST2";


interface ListAction {
  newList: number[];
  type: typeof LIST;
}

interface List2Action {
  newList: number[];
  type: typeof LIST2;
}



export type ActionTypes =
  | ListAction
  | List2Action
// | ChangeInputAction;

// actions


function list(newList: number[]) {
  return {
    type: LIST,
    newList: newList
  };
}
function list2(newList: number[]) {
  return {
    type: LIST2,
    newList: newList
  };
}
export const actionCreators = {
  list, list2
};

// reducers

const initialState: State = {
  list: [],
  list2: [1,2,3,4,5]
};

export function Reducer(
  state = initialState,
  action: ActionTypes
): State {
  switch (action.type) {
    case LIST:
      return {
        ...state,
        list: action.newList
      };
    case LIST2:
      return {
        ...state,
        list2: action.newList
      };
    default:
      return state;
  }
}