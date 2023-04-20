import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../store";

const serverBaseURL = "http://localhost:5001";

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString("en-US", { hour12: false })}`;
}

export default function RealTimeChart({ panelID }) {
  let { serverURL } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      serverURL: targetPanel[0]?.data?.datasource_url,
    };
  });
  console.log(
    "file: RealTimeChart.jsx:34 ~ let{serverURL}=useSelector ~ serverURL:",
    serverURL
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [domain, setDomain] = useState([null, null]);
  const [eventSource, setEventSource] = useState(null);
  // Dispatch data after it has been initialized
  if (data.length > 0) {
    dispatch(updateData({ data, panelID }));
  }
  const fetchData = useCallback(async () => {
    if (serverURL) {
      const newEventSource = await fetchEventSource(serverURL, {
        onmessage(ev) {
          const newData = JSON.parse(ev.data);
          console.log(
            "file: RealTimeChart.jsx:43 ~ onmessage ~ newData:",
            newData
          );
          setData((prevData) => [...prevData, newData]);
        },
      });

      setEventSource(newEventSource);
    }
  }, [serverURL]);

  useEffect(() => {
    console.log("ooooooooooooooooooooooooooooooooooooooooooooo");

    fetchData();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [fetchData]);

  useEffect(() => {
    if (serverURL && eventSource) {
      eventSource.close();
      fetchData();
    }
  }, [serverURL, fetchData]);

  // calculate domain of XAxis based on current time
  const now = new Date();
  const defaultDomain = [now.getTime() - 60000, now.getTime()];

  // filter data to show only the past 10 seconds
  const filteredData = data.filter((d) => d.timestamp > now.getTime() - 60000);
  // handle chart domain change on brush change event
  const handleBrushChange = (event) => {
    if (event.startIndex === 0 && event.endIndex === filteredData.length - 1) {
      setDomain(null);
    } else {
      setDomain([
        filteredData[event.startIndex].timestamp,
        filteredData[event.endIndex].timestamp,
      ]);
    }
  };
  // calculate the YAxis domain to center the line chart
  // const yValues = filteredData.map((d) => d.value);
  // const minValue = Math.min(...yValues);
  // const maxValue = Math.max(...yValues);
  // const range = maxValue - minValue;
  // const middleValue = minValue + range / 2;
  // const yDomain = [middleValue - range / 2, middleValue + range / 2];

  // render chart using `data`
  return (
    <ResponsiveContainer>
      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          domain={domain || defaultDomain}
          tickFormatter={formatTime}
          type="number"
        />
        <YAxis />
        <Tooltip labelFormatter={formatTime} />
        <Legend />
        <Line dataKey="value" stroke="#8884d8" />
        {/* <Brush
            stroke="#8884d8"
            dataKey="timestamp"
            startIndex={filteredData.length - 1000}
            endIndex={filteredData.length - 1}
            onChange={handleBrushChange}
          /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
