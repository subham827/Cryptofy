import { Button,Pagination } from '@mui/material';
import './App.css';


import Home from './components/Home';
import Coins from './components/Coins';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
 
  return (
   <>
    <Router>
      <div style={{ "backgroundColor" : "#14161a","color" : "white","minHeight" : "100vh"}}>
        <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/coins/:id">
          <Coins />
        </Route>
      </Switch>
      </div>
    </Router>
   </>
  );
}

export default App;
