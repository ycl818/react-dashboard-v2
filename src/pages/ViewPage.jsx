import { Box, Stack } from '@mui/material'
import Sidebar from '../components/EditComponents/Sidebar'
import React from 'react'
import Leftbar from '../components/EditComponents/Leftbar'
import Rightbar from '../components/EditComponents/Rightbar'

const ViewPage = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
        <Leftbar/>
        <Rightbar/>
      </Stack>
    </Box>
  )
}

export default ViewPage