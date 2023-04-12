import { createSlice, nanoid } from "@reduxjs/toolkit";

const widgetSlice = createSlice({
  name: "widgets",
  initialState: {
    widgetArray:
      [
        {
          i: nanoid(),
          x: 0,
          y: 0,
          w: 4,
          h: 1.5,
          panelName: "",
          data: {
            datasource: null,
            datasource_url: null,
            dataType: null,
            dataDetail: null,
          },
        },
      ] || [],
  },
  reducers: {
    fetchExistDashboard: (state, action) => {
      console.log(action.payload.data);
      state.widgetArray = action.payload.data;
    },
    updateDataSourceWithURL: (state, action) => {
      console.log(action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.datasource_url =
        action.payload.datasource_url;
      state.widgetArray[panelIndex].data.datasource =
        action.payload.datasourceName;
    },
    updatePanelName: (state, action) => {
      console.log(action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].panelName = action.payload.name;
    },
    loadUploadData: (state, action) => {
      console.log(action.payload.fileData);
      state.widgetArray = action.payload.fileData;
    },
    updateDataType: (state, action) => {
      console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataType = action.payload.selectedType;
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
      // const tempArray = state.widgetArray.map((widget) => ({
      //   ...widget,
      //   data: { ...widget.data },
      // }));
      const tempArray = [...state.widgetArray];
      console.log("temp:", tempArray);
      console.log(action);
      action.payload.layouts?.forEach((position) => {
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
      const panelNumber = state.widgetArray.length;
      state.widgetArray = [
        ...state.widgetArray,
        {
          i: nanoid(),
          x: 0,
          y: -1.5 * panelNumber,
          w: 4,
          h: 1.5,
          panelName: "",
          data: {
            datasource: null,
            datasource_url: null,
            dataType: null,
            dataDetail: null,
          },
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
  loadUploadData,
  updatePanelName,
  updateDataSourceWithURL,
  fetchExistDashboard,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
