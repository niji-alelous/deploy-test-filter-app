import { ADD_PRODUCT_TO_CART, CLEAR_CART, REMOVE_PRODUCT_FROM_CART } from "../actions/cartAction"

const initialState = {
  product: [],
  isCartVisible: false,
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_PRODUCT_TO_CART: {
      const { product } = action

      const existingProductItem = state.product.findIndex((item) => item.id === product.id)
      if (existingProductItem === -1) {
        return {
          ...state,
          product: [...state.product, { ...product, quantity: 1 }]
        }
      } else {
        // If the product already exists, update its quantity
        const updatedProductList = state.product.map((item, index) => {
          if (index === existingProductItem) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })

        return {
          ...state,
          product: updatedProductList
        }
      }
    }

    // Meta action.payload 
    case REMOVE_PRODUCT_FROM_CART: {
      const newProduct = action.payload

      const existingProductItemIndex = state.product.findIndex((item) => item.id === newProduct.id)

      if (existingProductItemIndex === -1) {
        return state // Product not found, no need to change state
      }

      const updatedProductList = state.product.map((item, index) => {
        if (index === existingProductItemIndex) {
          if (item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          } else {
            // If quantity is 1, remove the product from the list
            return null
          }
        }
        return item
      }).filter(Boolean) // Filter out null values from the array

      return {
        ...state,
        product: updatedProductList,
      }
    }

    case CLEAR_CART: {
      return {
        ...state,
        product: [], // Empty the product array to clear the cart
      }
    }

    default:
      return state
  }
}