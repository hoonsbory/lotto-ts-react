// types
  
  export interface State {
    list: number[];
  }
  
  export const LIST = "todo/LIST";
  
  interface ListAction {
    newList: number[];
    type: typeof LIST;
  }
  
  
  
  export type ActionTypes =
    | ListAction
    // | ToggleAction
    // | ChangeInputAction;
  
  // actions
  
  
  function list(newList: number[]) {
    return {
      type: LIST,
      newList : newList
    };
  }
  export const actionCreators = {
    list
  };
  
  // reducers
  
  const initialState: State = {
    list: [],
  };
  
  export function Reducer(
    state = initialState,
    action: ActionTypes
  ): State {
    switch (action.type) {
      case LIST:
        return {
          list: action.newList
        };
      default:
        return state;
    }
  }