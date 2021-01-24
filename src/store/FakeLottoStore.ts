// types

//interface를 통해 타입을 정해준다.
export interface State {
  list: number[][];
  drawCheck: boolean;
  corrected: boolean[];
  bonusCorrect: boolean[];
  resultTrigger: boolean;
  userResult: any
}

//액션 타입
export const LIST = "LIST";
export const DRAWCHECK = "DRAWCHECK";
export const CORRECTED = "CORRECTED";
export const BONUSCORRECT = "BONUSCORRECT";
export const TRIGGER = "TRIGGER";
export const USERRESULT = "USERRESULT"


//액션 인터페이스 , 함수의 인자를 여기서 설정한다.
interface ListAction {
  newList: number[][];
  type: typeof LIST;
}

interface DrawCheck {
  value: boolean;
  type: typeof DRAWCHECK;
}
interface Corrected {
  value: boolean[];
  type: typeof CORRECTED;
}
interface bonusCorrect {
  value: boolean[];
  type: typeof BONUSCORRECT;
}

interface ResultTrigger {
  value: boolean;
  type: typeof TRIGGER;
}

interface UserResult {
  value: any;
  type: typeof USERRESULT;
}

type ActionTypes = ListAction |
  DrawCheck | Corrected |
  ResultTrigger |
  bonusCorrect |
  UserResult
// interface ActionTypes {
//   actionTypes : ListAction | List2Action
// }
// | ChangeInputAction;

// actions


//액션 인터페이스 설정한 내용을 토대로 함수 작성.
function list(newList: number[][]) {
  return {
    type: LIST,
    newList: newList
  };
}

function drawCheck(value: boolean) {
  return {
    type: DRAWCHECK,
    value: value
  };
}
function corrected(value: boolean[]) {
  return {
    type: CORRECTED,
    value: value
  };
}
function bonusCorrect(value: boolean[]) {
  return {
    type: BONUSCORRECT,
    value: value
  };
}

function resultTrigger(value: boolean) {
  return {
    type: TRIGGER,
    value: value
  };
}

function userResult(value: any) {
  return {
    type: USERRESULT,
    value: value
  };
}

//액션 함수 export
export const actionCreators = {
  list, drawCheck, corrected, resultTrigger, bonusCorrect, userResult
}

//초기값 선언 타입은 가장 위에서 선언한 인터페이스
const initialState: State = {
  list: [[]],
  drawCheck: false,
  corrected: [],
  bonusCorrect: [],
  resultTrigger: false,
  userResult: {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    last: 0
  }
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

    case DRAWCHECK:
      return {
        ...state,
        drawCheck: action.value
      };
    case CORRECTED:
      return {
        ...state,
        corrected: action.value
      };
    case BONUSCORRECT:
      return {
        ...state,
        bonusCorrect: action.value
      };

    case TRIGGER:
      return {
        ...state,
        resultTrigger: action.value
      };

    case USERRESULT:
      return {
        ...state,
        userResult: action.value
      };
    default:
      return state;
  }
}
