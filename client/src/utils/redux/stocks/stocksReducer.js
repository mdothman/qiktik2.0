import {FETCH_STOCKS_REQUEST,FETCH_STOCKS_SUCCESS,FETCH_STOCKS_FAILURE} from "./stocksTypes"

const initialState = {
    loading:false,
    stocks:[],
    error:''
}

const stocksReducer = (state=initialState, action) =>{
    switch(action.type){
        case FETCH_STOCKS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case FETCH_STOCKS_SUCCESS:
            return{
                loading:false,
                stocks:action.payload,
                error:''
            }
         case FETCH_STOCKS_FAILURE:
             return{
                 loading:false,
                 stocks:[],
                 error:action.payload
             }   
             default: return state
    }
}

export default stocksReducer