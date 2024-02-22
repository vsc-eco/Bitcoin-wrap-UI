import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

type State = {
    render: string,
}

type Action = {
    type: "SET_RENDER",
    payload: string
}

type RouteComponentContextType = {
    state: State;
    dispatch: Dispatch<Action>
}

export const RouteComponentContext = createContext<RouteComponentContextType | undefined>(undefined);

// Define the reducer
const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case "SET_RENDER":
            return {...state, render: action.payload};
        default: 
            return state;
    }
}

// Define the provider component 
export const RouteComponentProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, { render: '' });
  
    return (
        <RouteComponentContext.Provider value={{state, dispatch}}>
        {children}
      </RouteComponentContext.Provider>
    );
};
