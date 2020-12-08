import React, { useState, useEffect } from "react";
import { Search, SideNavbar, StockCard, Chart } from "../../components";
import { Container, Row, Col,Media } from "reactstrap";
import { API, useAuth } from "../../utils";
import Axios from "axios"
import "./style.css";
import logo from "../../assets/imgs/simpleteal.png";
// loginRequired coming from useAuth in utils folder, ensuring that the user can't access qiktik without being logged in.

const Home = () => {
  const { loginRequired } = useAuth();
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const [displayData, setDisplayData] = useState({});
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
    loginRequired();
    // loadFavorites();
  }, [loginRequired]);
  

  function loadFavorites() {
    API.getFavorites()
    .then(({ data: favorites }) => {
      setFavoriteStocks(favorites);
    })
    .catch((err) => console.log(err));
  }

  function handleInput(event) {
  if(event){
    let symbol=event[0].symbol
    const requestOne = API.getBars(symbol);
    const requestTwo = API.getStock(symbol)
    Axios.all([requestOne,requestTwo])
   .then(Axios.spread((...res)=>{
     let chart = res[0].data
     let card = res[1].data
     setDisplayData(card)
     const labels= chart.map(day =>{
      let theDate = new Date(day.startEpochTime*1000)
      return theDate.toLocaleDateString()
       });
     const close = chart.map(day=> day.closePrice);
     const high = chart.map(day => day.highPrice);
     const low = chart.map(day => day.lowPrice); 
     setChartData({labels:labels,close:close,high:high,low:low})
     setIsLoading(false)
    }))
   .catch(err =>console.log(err))
  }
  else{isLoading(true)}
  }

  return (
    <Container fluid={true}>
      <Row md="3" id="full">
        {/* User is selecting and displaying favorite stocks from stock tile to side navbar */}
        <Col
          id="coll"
          xs="12"
          s="5"
          md="3"
          lg="3"
          style={{ marginLeft: "-15px" }}
        >
          <SideNavbar
            favoriteStocks={favoriteStocks}
            setFavoriteStocks={setFavoriteStocks}
          />
        </Col>

        <Col className="text-center" md="9" sm="12">
          <div className="row-col-sm text-light fontMe mt-3">
            <Media left className="">
              <Media object src={logo} alt="qiktik" id="homeLogo" />
            </Media>
          </div>
          <Search name="symbolLookup" onChange={(event)=>handleInput(event)}  />

          
            <Col>
              {isLoading? false:<StockCard displayData={displayData} />}
            </Col>
<div>
  {!isLoading?<Chart chartData={chartData} />:<></>}
</div>

          
        </Col> 
        
      </Row>
    </Container>
  );
};

export default Home;
