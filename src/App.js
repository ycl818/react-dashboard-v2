import { Routes, Route } from "react-router-dom";
import { Dashboard, EditPage, ViewPage } from "./pages";
import Navbar from "./components/Navbar";
import { Container } from "@mui/system";
import { CssBaseline, Grid } from "@mui/material";
import { useReducer } from "react";
import { ChartContext, chartReducer, initChartState } from "./store/chartStore";

import MyComponent from "./components/testComponents/MyComponent";

function App() {
  const reducerChart = useReducer(chartReducer, initChartState);

  return (
    <ChartContext.Provider value={reducerChart}>
      <Navbar />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          overflow: "auto",
          backgroundColor: "#19233C",
        }}
        style={{
          minHeight: "calc(100vh - 660px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/test" element={<MyComponent />}></Route>
          <Route path="/:title/edit" element={<EditPage />}></Route>
          <Route path="/:title/view" element={<ViewPage />}></Route>
        </Routes>
      </Container>
    </ChartContext.Provider>
  );
}

export default App;
