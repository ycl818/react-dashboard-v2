import { configureStore } from "@reduxjs/toolkit";
import {
  dashboardReducer,
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
} from "./slice/dashboardSlice";
import { widgetReducer } from "./slice/widgetSlice";
import { widgetApi } from "./api/widgetApi";

export const store = configureStore({
  reducer: {
    // dashboard: dashboardReducer,
    widget: widgetReducer,
    [widgetApi.reducerPath]: widgetApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(widgetApi.middleware);
  },
});

window.store = store;

export {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
};

export * from "./slice/widgetSlice";
export { useFetchWidgetDataQuery } from "./api/widgetApi";
