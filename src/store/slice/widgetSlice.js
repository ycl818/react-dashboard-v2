import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  widgetArray:
    [
      {
        i: nanoid(),
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        panelName: "",
        data: {
          datasource: null,
          datasource_url: null,
          dataType: null,
          dataDetail: null,
        },
        fetchError: false,
        fetchErrorMessage: "",
      },
    ] || [],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    fetchErrorShowBorder: (state, action) => {
      console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      state.widgetArray[panelIndex].fetchError = action.payload.res;
      state.widgetArray[panelIndex].fetchErrorMessage = action.payload.message;
    },
    updateDataByURL: (state, action) => {
      console.log(action.payload);

      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      state.widgetArray[panelIndex].data.dataDetail = action.payload.result;
    },
    pasteVariableIntoDataSourceURL: (state, action) => {
      console.log("file: widgetSlice.js:129 ~ action:", action.payload);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.datasource_url =
        action.payload.newDataSouceUrl;
    },
    fetchExistDashboard: (state, action) => {
      console.log(action.payload.data);
      state.widgetArray = action.payload.panelArray;
    },
    updateDataSourceWithURL: (state, action) => {
      //console.log("update URL~~~~~~~~~~", action.payload);
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
      //console.log(action.payload.widgetArray);
      state.widgetArray = action.payload.widgetArray;
    },
    updateDataType: (state, action) => {
      //console.log(action);
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.panelID
      );
      state.widgetArray[panelIndex].data.dataType = action.payload.selectedType;
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
      // console.log("temp:", tempArray);
      //console.log(action);
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
      const panelNumber = state.widgetArray?.length;
      state.widgetArray = [
        ...state.widgetArray,
        {
          i: nanoid(),
          x: 0,
          y: -1.5 * panelNumber,
          w: 4,
          h: 2,
          panelName: "",
          data: {
            datasource: null,
            datasource_url: null,
            dataType: null,
            dataDetail: null,
          },
          fetchError: false,
          fetchErrorMessage: "",
        },
      ];
    },
    deleteWidget: (state, action) => {
      const panelIndex = state.widgetArray.findIndex(
        (panel) => panel.i === action.payload.id
      );
      const tempArray = [...state.widgetArray];
      tempArray.splice(panelIndex, 1);
      state.widgetArray = tempArray;
    },
    cleanUpAllPanel: (state, action) => {
      console.log(action);
      state.widgetArray = initialState;
    },
  },
});

export const {
  modifyLayouts,
  addWidget,
  deleteWidget,
  updateData,
  updateDataType,
  loadUploadData,
  updatePanelName,
  updateDataSourceWithURL,
  fetchExistDashboard,
  pasteVariableIntoDataSourceURL,
  updateDataByURL,
  fetchErrorShowBorder,
  cleanUpAllPanel,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
