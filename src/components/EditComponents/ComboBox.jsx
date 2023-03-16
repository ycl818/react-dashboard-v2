import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ChartContext } from '../../store/chartStore';

const ComboBox = () => {

  const charts = ['Line Chart', 'Bar Chart', 'Area Chart', 'Pie Chart']
  const [chartState, dispatch] = useContext(ChartContext)
  console.log(chartState)

  return (
    <Autocomplete
        disablePortal
        id="combo-box"
        options={charts}
        sx={{ width: "100%" }}

        renderInput={(params) => <TextField {...params} label="Charts" />}
        onChange={(e) => {
            console.log(typeof e.target.textContent)
            dispatch({
                type:'CHANGE_CHART_TYPE',
                payload:e.target.textContent
            })
        }}
    />
  )
}

export default ComboBox