// types
//interface를 통해 타입을 정해준다.
export interface State {
  list: number[];
  list2: number[]
}

//액션 타입
export const LIST = "LIST";
export const LIST2 = "LIST2";


//액션 인터페이스 , 함수의 인자를 여기서 설정한다.
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


//액션 인터페이스 설정한 내용을 토대로 함수 작성.
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

//액션 함수 export
export const actionCreators = {
  list, list2
};

//초기값 선언 타입은 가장 위에서 선언한 인터페이스
const initialState: State = {
  list: [],
  list2: [1,2,3,4,5]
};

// reducers
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