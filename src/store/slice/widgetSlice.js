import { createSlice, nanoid } from "@reduxjs/toolkit";

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    widgetArray: [
      {
        i: nanoid(),
        x: 0,
        y: 0,
        w: 4,
        h: 1.5,
        data: { datasource: null, dataType: null, dataDetail: null },
      },
    ],
  },
  reducers: {
    updateDataType: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataType = action.payload.name;
    },
    updateDataSource: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.datasource =
        action.payload.datasourceName;
    },
    updateData: (state, action) => {
      console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataDetail = action.payload.data;
    },
    modifyLayouts: (state, action) => {
      const tempArray = state.widgetArray.map((widget) => ({ ...widget }));
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
        {
          i: nanoid(),
          x: 0,
          y: -1,
          w: 4,
          h: 1.5,
          data: { datasource: null, dataType: null, dataDetail: null },
        },
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

export const {
  modifyLayouts,
  addWidget,
  deleteWidget,
  updateData,
  updateDataSource,
  updateDataType,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
