import React, { useMemo, useReducer, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Link } from "react-router-dom";
import DropdownTitle from "../components/DropdownTitle";
import { Box, Button, Typography } from "@mui/material";
import GraphTypeSwitcher from "./GraphTypeSwitcher";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, deleteWidget, modifyLayouts } from "../store";

const GridLayout = ({ chartState }) => {
  const ResponsiveReactGridLayout = WidthProvider(Responsive);

  const dispatch = useDispatch();
  const widgetA = useSelector((state) => state.widget.widgetArray);
  //const layouts = useSelector((state) => state.widget.widgetArray);
  console.log(widgetA);
  console.log(widgetA[0].data.dataDetail);
  const saveLayout = localStorage.getItem("grid-layout");
  const layoutSave = saveLayout ? JSON.parse(saveLayout) : widgetA;
  console.log(layoutSave);

  const title = `${chartState.title}` || "NewTitle";

  //   console.log("title is here:", title)

  const handleModify = (layout, layouts) => {
    console.log("layouts: ~~", layout);

    // dispatch(modifyLayouts(layouts, layout));
    localStorage.setItem("grid-layout", JSON.stringify(layout));
  };

  const handleDelete = (key) => {
    dispatch(deleteWidget(key));
  };

  return (
    <Box sx={{ height: "100%" }}>
      {/* <button className="btn primary" >Add Widget</button> */}
      {/* <Button variant="contained" onClick={() => handleAdd()}>
        Add Widget
      </Button> */}
      <ResponsiveReactGridLayout
        style={{ display: "flex" }}
        onLayoutChange={handleModify}
        //verticalCompact={true}
        layout={layoutSave}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        //preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 6, xs: 4, xxs: 2 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetA?.map((widget, index) => {
          console.log(widget.data);
          let keysArry = [];
          if (widget.data?.dataDetail) {
            keysArry = Object.keys(widget.data.dataDetail[0]);
            console.log(keysArry);
          }
          return (
            <Box
              component="div"
              className="reactGridItem"
              key={widget.i}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 1,
                maxW: Infinity,
                minH: 1,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <DropdownTitle
                panelID={widget.i}
                title={`${chartState.title}` || "New Title"}
              />

              {/* <Barchart height="100%"/> */}

              {widget.data?.datasource ? (
                <>
                  <Box
                    component="div"
                    sx={{ width: "100%", height: "100%", marginTop: "4rem" }}
                    p={3}
                  >
                    <GraphTypeSwitcher
                      type={`${chartState.type}`}
                      data={widget.data.dataDetail}
                      width={500}
                      height={300}
                      dataKey={keysArry[1]}
                      XaxisName={"name"}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to={`/${widget.i}/edit`}
                    sx={{ width: "100%", height: "70%", marginTop: "-30" }}
                  >
                    <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                      Add a new panel
                    </Typography>
                  </Button>
                  {/* <button
                    className="deleteButton"
                    onClick={() => handleDelete(widget.i)}
                  >
                    x
                  </button> */}
                </>
              )}

              {/* <div>{widget.i}</div> */}
            </Box>
          );
        })}
      </ResponsiveReactGridLayout>
    </Box>
  );
};

export default GridLayout;
