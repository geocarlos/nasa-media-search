import { createContext, useReducer } from "react";

export const AppContext = createContext({} as any);

export enum ActionTypes {
  FETCH_ITEMS = "FETCH_ITEMS",
  FETCH_ITEMS_FULFILLED = "FETCH_ITEMS_FULFILLED",
  FETCH_ITEMS_REJECTED = "FETCH_ITEMS_REJECTED",
  SELECT_ITEM = "SELECT_ITEM"
}

export interface AppState {
  items: any[];
  selectedItem: any;
  loading: boolean;
  error: any;
}

export interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE: AppState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null
};

const reducer = (state: AppState, action: Action) => {
  console.log(action.type);
  switch (action.type) {
    case ActionTypes.FETCH_ITEMS:
      return { ...state, loading: true };
    case ActionTypes.FETCH_ITEMS_FULFILLED:
      return { ...state, items: action.payload, loading: false };
    case ActionTypes.SELECT_ITEM:
      return { ...state, selectedItem: action.payload };
    case ActionTypes.FETCH_ITEMS_REJECTED:
      return { ...state, loading: false, error: action.payload };
  }
  return state;
};

const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
