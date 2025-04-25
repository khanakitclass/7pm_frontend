import { combineReducers } from "redux";
import counterSlice from '../slice/counter.slice';
import subcategorySlice from '../slice/subcategory.slice';
import categorySlice from '../slice/category.slice';
import authSlice from '../slice/auth.slice';
import alertSlice from '../slice/alert.slice';



export const rootReducer = combineReducers({
   count: counterSlice, 
   subcategory: subcategorySlice,
   category: categorySlice,
   auth: authSlice,
   alert: alertSlice
})