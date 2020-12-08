import React, { useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {fetchStocks} from '../../utils/redux'
import {connect} from "react-redux"

 function Search({stocksData, fetchStocks}) {
   useEffect(()=>{
     fetchStocks()
   },[])
  // typeahead is a reactstrap feature. Searching stock names or symbols
  return stocksData.loading ? (<h2>Loading</h2>)
  : stocksData.error ? (<h2>{stocksData.error}</h2>):(
    <Typeahead
      size="lg"
      className="input-group mt-5 mb-5"
      id="stock-search"
      labelKey={(stock) => `${stock.symbol}: ${stock.name}`}
      options={stocksData.stocks}
      
      placeholder="Choose a stock..."
    ></Typeahead>
  );
}

const mapStateToProps = state => {
  return {
    stocksData:state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: () =>dispatch(fetchStocks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)