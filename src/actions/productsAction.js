export const GET_PRODUCTS = "GET_PRODUCTS"
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';


export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
})

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
})

export const getProducts = (productList) => ({
  type: GET_PRODUCTS,
  payload: productList,
})

export const updateProducts = (products) => ({
  type: UPDATE_PRODUCTS,
  payload: products,
})