import React, { createContext, useReducer } from 'react';
import { ContextProps, AppReducer, AppProviderProps } from '../interfaces';
import { reducer } from '../reducers';

export const AppContext = createContext<ContextProps>({} as ContextProps);

const AppProvider = ({ children }: AppProviderProps) => {

    //intial state
    const initialState: AppReducer = {
        data: [],
        value: 'date',
    }

    //useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    //set value to props
    const value = {
        state,
        dispatch,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
