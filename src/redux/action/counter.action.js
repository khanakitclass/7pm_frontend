import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes"

export const increment = () => (dispatch) => {
    console.log("fff");     //2
    
    dispatch({type: INCREMENT_COUNTER})
}

export const decrement = () => (dispatch) => {
    dispatch({type: DECREMENT_COUNTER})
}