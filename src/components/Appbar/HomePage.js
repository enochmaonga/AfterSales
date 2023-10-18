import { Container, Grid } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
   <Container>
    <Grid Container>
      <Grid item sx={{justifyContent: "left", fontSize: 20}}>Welcome to Joscare</Grid>
    </Grid>
   </Container>
  )
}

export default HomePage