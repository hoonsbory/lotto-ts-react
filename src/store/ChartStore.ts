// types

import { RankResult } from "../models/RankResult";

//interface를 통해 타입을 정해준다.
export interface ChartState {
  chartMainData: any;
  chartList: number[][];
  chartBonusList: number[][];
  userChartSum: any;
  userChartList: number[][];
  graphSize: number;
  recentRound: number;
  roundSelect1: number
  roundSelect2: number
  sortBtn: boolean;
}

//액션 타입
export const CHARTMAINDATA = "CHARTMAINDATA";
export const CHARTLIST = "CHARTLIST";
export const CHARTBONUSLIST = "CHARTBONUSLIST";
export const USERCHARTSUM = "USERCHARTSUM";
export const USERCHARTLIST = "USERCHARTLIST";
export const GRAPHSIZE = "GRAPHSIZE";
export const RECENTROUND = "RECENTROUND";
export const ROUNDSELECT1 = "ROUNDSELECT1"
export const ROUNDSELECT2 = "ROUNDSELECT2"
export const SORTBTN = "SORTBTN"


//액션 인터페이스 , 함수의 인자를 여기서 설정한다.

interface chartMainDataAction {
  newList: number[][];
  type: typeof CHARTMAINDATA;
}
interface chartListAction {
  newList: number[][];
  type: typeof CHARTLIST;
}
interface chartListWithBonusAction {
  newList: number[][];
  type: typeof CHARTBONUSLIST;
}
interface userChartSumAction {
  newData: any;
  type: typeof USERCHARTSUM;
}
interface userChartListAction {
  newList: number[][];
  type: typeof USERCHARTLIST;
}
interface GraphSize {
  size: number;
  type: typeof GRAPHSIZE;
}

interface RecentRound {
  value: number;
  type: typeof RECENTROUND;
}
interface SortBtn {
  value: boolean;
  type: typeof SORTBTN;
}


interface RoundSelect1 {
  value: number;
  type: typeof ROUNDSELECT1;
}
interface RoundSelect2 {
  value: number;
  type: typeof ROUNDSELECT2;
}


type ActionTypes =
  chartMainDataAction |
  chartListAction |
  chartListWithBonusAction |
  userChartSumAction |
  userChartListAction |
  GraphSize |
  RecentRound |
  RoundSelect1 |
  RoundSelect2 | 
  SortBtn
// interface ActionTypes {
//   actionTypes : ListAction | List2Action
// }
// | ChangeInputAction;

// actions


//액션 인터페이스 설정한 내용을 토대로 함수 작성.
function chartMainData(newList: number[]) {
  return {
    type: CHARTMAINDATA,
    newList: newList
  };
}
function chartList(newList: number[]) {
  return {
    type: CHARTLIST,
    newList: newList
  };
}
function chartBonusList(newList: number[]) {
  return {
    type: CHARTBONUSLIST,
    newList: newList
  };
}
function userChartList(newList: number[]) {
  return {
    type: USERCHARTLIST,
    newList: newList
  };
}
function graphSizeUp(size: number) {
  return {
    type: GRAPHSIZE,
    size: size
  };
}
function userChartSum(newData: any) {
  return {
    type: USERCHARTSUM,
    newData: newData
  };
}
function graphSizeDown(size: number) {
  return {
    type: GRAPHSIZE,
    size: size
  };
}

function recentRound(value: number) {
  return {
    type: RECENTROUND,
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
function sortBtn() {
  return {
    type: SORTBTN
  };
}

//액션 함수 export
export const actionCreators = {
  chartMainData, chartList, chartBonusList, userChartSum, userChartList, graphSizeUp, graphSizeDown, recentRound, roundSelect1, roundSelect2, sortBtn
};

//초기값 선언 타입은 가장 위에서 선언한 인터페이스
const initialState: ChartState = {
  chartMainData: [[]],
  chartList: [],
  chartBonusList: [],
  userChartSum: [],
  userChartList: [],
  graphSize: 1160,
  recentRound: 0,
  roundSelect1: 1,
  roundSelect2: 1,
  sortBtn: false //false가 내림차순
};

// reducers
export function ChartReducer(
  state = initialState,
  action: ActionTypes
): ChartState {
  switch (action.type) {
    case CHARTMAINDATA:
      return {
        ...state,
        chartMainData: action.newList
      };
    case CHARTLIST:
      return {
        ...state,
        chartList: action.newList
      };
    case CHARTBONUSLIST:
      return {
        ...state,
        chartBonusList: action.newList
      };
    case USERCHARTSUM:
      return {
        ...state,
        userChartSum: action.newData
      };
    case USERCHARTLIST:
      return {
        ...state,
        userChartList: action.newList
      };
    case GRAPHSIZE:
      return {
        ...state,
        graphSize: action.size
      };

    case RECENTROUND:
      return {
        ...state,
        recentRound: action.value
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
      case SORTBTN:
        return {
          ...state,
          sortBtn: state.sortBtn ? false : true
        };
    default:
      return state;
  }
}

