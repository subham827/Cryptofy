import React from 'react'
import { TrendingCoins } from '../config/api';
import { Crypto} from '../CryptoContext'

import axios from 'axios';
import { useContext,useState,useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
  
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency,symbol } = useContext(Crypto);
    const fetchCoins = async()=>{
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);

       setTrending(data)
       console.log(trending);
    }
    useEffect(()=>{
        fetchCoins();
    },[currency])
    const items = trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h>0;
        return( 
            <Link to={`/coins/${coin.id}`} style={{display: "flex", flexDirection: "column", alignItems : "center", cursor: "pointer" , color : "white" , textTransform : "uppercase"}}>
                <img src={coin.image} alt={coin.name} height= "80" style={{marginBottom: 10}}></img>
                 <span>{coin.symbol}
                 &nbsp;</span>
                 <span   style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>{profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%</span>
                <span style={{ fontSize : 22, fontWeight : 500}}>{symbol} {numberWithCommas(coin.current_price.toFixed(2))}</span>

            </Link>
        )})

    const responsive = {
        0: { items: 2 },
        600: { items: 4 },
        1000: { items: 5 },
        1200: { items: 6 }
    };
  return (
    <div>
        <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items} disableButtonsControls></AliceCarousel>
    </div>
  )
}

export default Carousel