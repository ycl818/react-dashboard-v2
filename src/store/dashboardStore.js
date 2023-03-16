import { createContext } from "react";

export const DashboardContext = createContext({});

export const initDashboardState = {
    widgetList:[]
}

export const dashboardReducer = (state, action) => {
    switch(action.type) {
       
        default:
            return state
    }
}