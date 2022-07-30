import React from 'react'
import {useState,useEffect,useContext} from 'react'
import {Crypto} from '../CryptoContext'
import {useHistory} from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {makeStyles} from '@mui/styles'
import axios from 'axios'
import { Button, CircularProgress } from '@mui/material'
import data, { chartDays } from "../config/data.js"
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import  SelectButton  from './SelectButton'


const CoinInfo = ({coin}) => {
    const [historicalData, setHistoricalData] = useState();
    const [flag, setflag] = useState(false);
    const [days, setDays] = useState(1);
    const { currency , symbol } = useContext(Crypto);
    const history = useHistory();
    const fetchHistoricalData = async () => {
        const  {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setHistoricalData(data.prices);
    }
    useEffect(() => {
        fetchHistoricalData();
    }
    ,[days,currency])
    const darkTheme = createTheme({
        palette: {
             primary : {
              main : "#fff",
             },
             mode : "dark",
        },
      });
    const useStyles = makeStyles((theme)=>({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
              width: "100%",
              marginTop: 0,
              padding: 20,
              paddingTop: 0,
            },
          },

    }))
    const classes = useStyles();


  return (
    <>
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
         {
            !historicalData ? <CircularProgress style={{color : "gold"}} size={250} thickness={1} /> :(<>
            <Line data = {{
                labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time  = date.getHours() > 12 ? `${date.getHours()-12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString()
                }),
                datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },

            }}></Line>
            <div  style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
                {chartDays.map((day)=>{
              return   <SelectButton
                key={day.value}
                onClick={() => {
                    setDays(day.value);
                    if (days !== day.value) setflag(false);
                    }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
                })} 
            </div>
            </>) 
         }
        </div>
    <CssBaseline />
    </ThemeProvider>
    </>
  )
}

export default CoinInfo