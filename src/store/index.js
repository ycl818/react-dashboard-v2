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

export const store = configureStore({
  reducer: {
    // dashboard: dashboardReducer,
    widget: widgetReducer,
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
