export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
export const CLEAR_CART = "CLEAR_CART"

export const addProducToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product,
})

// meta action.payload dans le reducer
export const removeProducFromCart = (product) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: product,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})