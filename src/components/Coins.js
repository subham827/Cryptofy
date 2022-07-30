import React from 'react'
import { useParams } from 'react-router-dom'
import { Crypto } from '../CryptoContext'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import CoinInfo from './CoinInfo'
import { SingleCoin } from '../config/api'
import { LinearProgress, Typography } from '@mui/material'
import { numberWithCommas } from './CoinsTable'
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import ReactHtmlParser from 'react-html-parser';



const Coins = () => {
  const {  id } = useParams();
  const [coin, setCoin] = useState();

  const { currency , symbol } = useContext(Crypto);
  const fetchCoin = async()=>{
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }
  console.log(coin);
  
  useEffect(()=>{
    fetchCoin();
  },[])
  const history = useHistory();
  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //   },
  // });
  
  const useStyles = makeStyles((theme)=>({
    container:{
      display: "flex",
      [theme.breakpoints.down('md')]: {
        flexDirection: "column",
        alignItems: "center",
      },
      
    },
    sidebar:{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "30%",
      // height : "100vh",
      [theme.breakpoints.down('md')]: {
        width: "100%",
      },
      marginTop : 25,
      borderRight : "2px solid grey"
    },
    heading:{
      fontWeight : "bold",
      marginBottom : 20,

    },
    description:{
      fontSize : 14,
      marginBottom : 20,
      width : "100%",
      padding : 25,
      paddingBottom : 15,
      paddingTop : 0,
      textAlign : "justify"

    },
    marketdata:{
      alignSelf : "start",
      padding : 25,
      paddingTop : 10,
      width : "100%",
      [theme.breakpoints.down('md')]: {
        display : "flex",
        justifyContent : "space-around",
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        alignItems: "center",
      },
     [theme.breakpoints.down('xs')]: {
      alignItems : "start"
     }


    },
  }))
  const classes = useStyles();
  if(!coin ) {
    return <LinearProgress style ={{backgroundColor : "gold"}}>

    </LinearProgress>
  }
  return (
   <>
  <ThemeProvider>
    <CssBaseline />
    <div className={classes.container}>
    <div className={classes.sidebar}>
      <img src = {coin?.image.large} alt = {coin?.name} height="200" style={{marginBottom:20}}></img>
      <Typography variant="h3" className={classes.heading}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitle1" style={{color : "gold"}} className= {classes.description}>
        {/* Display description in 25 words */}
        {coin?.description.en.slice(0,100) + "..."}
        

      </Typography>
      <div className={classes.marketdata}>
        <span style = {{display : "flex"}}>
          <Typography variant="h5" style={{color : "white",fontWeight : "bold"}}>
           RANK : <span style={{fontWeight : "lighter"}}>{coin?.market_cap_rank}</span>
            </Typography>
        </span>
        <span style = {{display : "flex"}}>
          <Typography variant="h5" style={{color : "white",fontWeight : "bold"}}>
           Current Price : <span style={{fontWeight : "lighter"}}>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</span>
            </Typography>
        </span>
        <span style = {{display : "flex"}}>
          <Typography variant="h5" style={{color : "white",fontWeight : "bold"}}>
           Market Cap : {" "} <span style={{fontWeight : "lighter"}}>{symbol}{" "} {numberWithCommas(
                           coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)

                          )}
                          {" "}
                          M</span>
            </Typography>
        </span>
      </div>
    </div>
      <CoinInfo coin={coin}/>
   </div>
  </ThemeProvider>
   </>
  )
}

export default Coins