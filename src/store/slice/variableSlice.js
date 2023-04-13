import { createSlice, nanoid } from "@reduxjs/toolkit";

const variableSlice = createSlice({
  name: "variables",
  initialState: {
    variableArray: [],
  },
  reducers: {
    addVariable: (state, action) => {
      console.log(action.payload);
      state.variableArray.push({
        variableName: action.payload.inputs.variableName,
        defaultValue: action.payload.inputs.defaultValue,
        id: nanoid(),
      });
    },
  },
});

export const { addVariable } = variableSlice.actions;
export const variableReducer = variableSlice.reducer;
