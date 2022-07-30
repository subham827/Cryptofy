import { AppBar, Container,MenuItem,Select,Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Crypto } from '../CryptoContext';


const Header = () => {
  const darkTheme = createTheme({
    palette: {
         primary : {
          main : "#fff",
         },
         mode : "dark",
    },
  });
  const { currency, setCurrency} = useContext(Crypto);
  console.log(currency)
  const history = useHistory()
  return (
    <>
    <ThemeProvider theme = {darkTheme}>

      <CssBaseline />
    <AppBar color='transparent' position="static">
      <Container>
         <Toolbar>
          <Typography onClick={()=> history.push("/")}style={{"color" : "gold", "fontWeight" : "bold", "fontSize" : "20px" , "cursor" : "pointer"}}>
            Cryptofy
          </Typography>
          <Select
            value={currency}
            onChange={(e)=> setCurrency(e.target.value)}
           
          variant='filled'
          style={{marginRight: 15, width: 100,height: 40}}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>

          </Select>
         </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    </>
  )
}

export default Header