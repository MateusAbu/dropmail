import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'


const CircleCountdown = ({ countdown }: any) => {

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress color="primary" variant="indeterminate" value={countdown} data-testid="circle-countdown" />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    data-testid="countdown-text"
                >{countdown}</Typography>
            </Box>
        </Box>
    )
}

export default CircleCountdown