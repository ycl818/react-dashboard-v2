
import React from 'react'
import { ChartTypeSwitcher } from '../ChartTypeSwitcher'

const GraphTypeSwitcher = ({ type, data, width, height }) => {

  return (
    <ChartTypeSwitcher type={type} data={data} width={width} height={height} />
  )
}

export default GraphTypeSwitcher