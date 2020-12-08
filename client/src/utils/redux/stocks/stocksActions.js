import API from "../../API"
import {FETCH_STOCKS_REQUEST,FETCH_STOCKS_SUCCESS,FETCH_STOCKS_FAILURE} from "./stocksTypes"

export const fetchStocksRequest = () => {
    return{
        type:FETCH_STOCKS_REQUEST,
        info:"Request Alpaca"
    }
}

export const fetchStocksSuccess = stocks =>{
    return{
        type:FETCH_STOCKS_SUCCESS,
        payload:stocks,
        info:"Success!"
    }
}

export const fetchStocksFailure = err => {
    return{
        type:FETCH_STOCKS_FAILURE,
        payload:err,
        info:"Failure."
    }
}

export const fetchStocks = () =>{
    return(dispatch) =>{
        dispatch(fetchStocksRequest)
        API.getStocks()
        .then(res => {
            const stock = res.data
            dispatch(fetchStocksSuccess(stock))
        })
        .catch(err=>{
            const error = err.message
            dispatch(fetchStocksFailure(error))
        })
        
    }
}
