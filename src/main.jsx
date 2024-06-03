import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { getProducts } from './actions/productsAction.js'
import { productListData } from './product-list.data.js'


const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

store.dispatch(getProducts(productListData))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
