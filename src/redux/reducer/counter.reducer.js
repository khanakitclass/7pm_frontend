import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes";

const initialStates = {
    count: 0
}

export const counterReducer = (state=initialStates, action) => {
    console.log(action);        //3
    
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                count: state.count + 1
            }
        case DECREMENT_COUNTER:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}