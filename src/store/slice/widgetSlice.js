import { createSlice, nanoid } from "@reduxjs/toolkit";

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    layouts: [{ i: nanoid(), x: 0, y: 0, w: 4, h: 1.5 }],
    widgetArray: [{ i: nanoid(), x: 0, y: 0, w: 4, h: 1.5 }],
  },
  reducers: {
    modifyLayouts: (state, action) => {
      const tempArray = [...state.widgetArray];
      console.log(action.payload);
      state.layouts = action.payload;
      action.payload?.map((position) => {
        const widgetIndex = tempArray.findIndex(
          (widget) => widget.i === position.i
        );
        if (widgetIndex !== -1) {
          tempArray[Number(widgetIndex)].x = position.x;
          tempArray[Number(widgetIndex)].y = position.y;
          tempArray[Number(widgetIndex)].w = position.w;
          tempArray[Number(widgetIndex)].h = position.h;
        }
      });
      state.widgetArray = tempArray;
    },
    addWidget: (state) => {
      state.widgetArray = [
        ...state.widgetArray,
        { i: nanoid(), x: 0, y: -1, w: 4, h: 1.5 },
      ];
    },
    deleteWidget: (state, action) => {
      const tempArray = state.widgetArray.slice();
      const index = tempArray.indexOf(
        tempArray.find((data) => data.i === action.payload)
      );
      tempArray.splice(index, 1);
      state.widgetArray = tempArray;
    },
  },
});

export const { modifyLayouts, addWidget, deleteWidget } = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
