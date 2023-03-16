import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { ChartContext } from '../store/chartStore';
import ChartNameField from './EditComponents/ChartNameField';
import GraphTypeSwitcher from './GraphTypeSwitcher';


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const GraphBolck = () => {

  const [chartState, dispatch] = useContext(ChartContext)


  return (
    

    <>
     
      <Box component="div" sx={{ height:"100%", display:"flex", flexDirection:"column"}} p={5} m={2}>
           <ChartNameField />
          <GraphTypeSwitcher type={`${chartState.type}`} data={data} width={500} height={300}/>
      </Box>
     
      </>
  )
}

{/* <GraphTypeSwitcher type={`${chartState.type}`} data={data} width={500} height={300}/>
</Box> */}
export default GraphBolck