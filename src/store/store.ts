// types

//interface를 통해 타입을 정해준다.
export interface State {
  list: number[][];
  accumulateList: number[][];
  graphSize: number;
  drawCheck: boolean;
  corrected: boolean[];
  bonusCorrect: boolean[];
  recentRound: number;
  resultTrigger: boolean;
  roundSelect1: number
  roundSelect2: number
  userResult: any
}

//액션 타입
export const LIST = "LIST";
export const ALIST = "ALIST";
export const RESIZE = "RESIZE";
export const GRAPHSIZE = "GRAPHSIZE";
export const DRAWCHECK = "DRAWCHECK";
export const CORRECTED = "CORRECTED";
export const BONUSCORRECT = "BONUSCORRECT";
export const RECENTROUND = "RECENTROUND";
export const TRIGGER = "TRIGGER";
export const ROUNDSELECT1 = "ROUNDSELECT1"
export const ROUNDSELECT2 = "ROUNDSELECT2"
export const USERRESULT = "USERRESULT"


//액션 인터페이스 , 함수의 인자를 여기서 설정한다.
interface ListAction {
  newList: number[][];
  type: typeof LIST;
}

interface AccumulateListAction {
  newList: number[][];
  type: typeof ALIST;
}

interface GraphSize {
  size: number;
  type: typeof GRAPHSIZE;
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
interface RecentRound {
  value: number;
  type: typeof RECENTROUND;
}

interface ResultTrigger {
  value: boolean;
  type: typeof TRIGGER;
}
interface RoundSelect1 {
  value: number;
  type: typeof ROUNDSELECT1;
}
interface RoundSelect2 {
  value: number;
  type: typeof ROUNDSELECT2;
}
interface UserResult {
  value: any;
  type: typeof USERRESULT;
}

type ActionTypes = ListAction |
  AccumulateListAction |
  GraphSize |
  DrawCheck | Corrected |
  RecentRound |
  ResultTrigger |
  bonusCorrect |
  RoundSelect1 |
  RoundSelect2 | 
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
function accumulateList(newList: number[]) {
  return {
    type: ALIST,
    newList: newList
  };
}
function graphSizeUp(size: number) {
  return {
    type: GRAPHSIZE,
    size: size
  };
}
function graphSizeDown(size: number) {
  return {
    type: GRAPHSIZE,
    size: size
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
function recentRound(value: number) {
  return {
    type: RECENTROUND,
    value: value
  };
}
function resultTrigger(value: boolean) {
  return {
    type: TRIGGER,
    value: value
  };
}
function roundSelect1(value: number) {
  return {
    type: ROUNDSELECT1,
    value: value
  };
}
function roundSelect2(value: number) {
  return {
    type: ROUNDSELECT2,
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
  list, accumulateList, graphSizeUp, graphSizeDown, drawCheck, corrected, recentRound, resultTrigger, bonusCorrect, roundSelect1, roundSelect2, userResult
};

//초기값 선언 타입은 가장 위에서 선언한 인터페이스
const initialState: State = {
  list: [[]],
  accumulateList: [],
  graphSize: 1160,
  drawCheck: false,
  corrected: [],
  bonusCorrect: [],
  recentRound: 0,
  resultTrigger: false,
  roundSelect1: 1,
  roundSelect2: 1,
  userResult: {
    first : 0,
    second : 0,
    third : 0,
    fourth : 0,
    fifth : 0,
    last : 0
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
    case ALIST:
      return {
        ...state,
        accumulateList: action.newList
      };
    case GRAPHSIZE:
      return {
        ...state,
        graphSize: action.size
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
    case RECENTROUND:
      return {
        ...state,
        recentRound: action.value
      };
    case TRIGGER:
      return {
        ...state,
        resultTrigger: action.value
      };
    case ROUNDSELECT1:
      return {
        ...state,
        roundSelect1: action.value
      };
    case ROUNDSELECT2:
      return {
        ...state,
        roundSelect2: action.value
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
