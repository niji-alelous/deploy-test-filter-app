import { combineReducers } from 'redux'
import userReducer from './userReducer'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  userReducer,
  productsReducer,
  cartReducer
})