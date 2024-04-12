import React from 'react'
import { Typography, Box, } from '@mui/material';


const Result = () => {
    return (
        <div>
            <Typography
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'serif',
                    fontWeight: 1000,
                    fontSize: '2.7rem',
                    letterSpacing: '.03rem',
                    color: 'black',
                    textDecoration: 'none',
                    mt: '30px',
                    ml: '50px',
                }}
            >
                AI<span style={{ marginRight: '13px' }} />Result
            </Typography>

            <Typography sx={{ mt: 3, mb: 1, pl: 6, color: "gray" }}>
            Below is the results based on your responses:
            </Typography>
        </div>
    )
}

export default Result