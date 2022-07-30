import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{ "backgroundImage" : "url(./banner.jpeg)"}}>
        <Container style = {{"height" : 400,"display" : "flex", "flexDirection" : "column", "justifyContent" : "space-around", "paddingTop" : "25"}}>
            <center>

          <div style={
            {
                height : "40%"
            }
          } >
            <Typography variant = "h2" style={{fontWeight:"bold", marginBottom : 15}}>Cryptofy</Typography>
            <Typography variant = "subtitle2" style={{color : "darkgrey", textTransform : "capitalize"}}>Get all the Info regarding your favourite crypto here</Typography>

            </div>   
            </center>
            <Carousel></Carousel>
        </Container>
    </div>
  )
}

export default Banner