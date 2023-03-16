import { Box, TextField, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import React, { useContext, useRef, useState } from 'react'
import { ChartContext } from '../../store/chartStore';

const ChartNameField = () => {

	const [chartState, dispatch] = useContext(ChartContext)
  const [name, setName] = useState(`${chartState.title}` || 'New Title');
  const [isNameFocused, setIsNamedFocused] = useState(false);
	
	const titleText = useRef(null)

  return (
    <>
		  
			  {!isNameFocused ? (
        <Typography
				  sx={{textAlign:"center"}}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={name}
					variant="filled"
					size="small"
					ref={titleText.current}
          onChange={event => {
						setName(event.target.value)
					}
					}
          onBlur={event => {setIsNamedFocused(false) ; 	dispatch({
						type:"CHANGE_CHART_NAME",
						payload: name
					})}}
				
					sx={{marginBottom:"1rem",input: {textAlign: "center"}, width:"30%", margin:"auto"}}
        />
      )}
		
    </>
  )
}

export default ChartNameField