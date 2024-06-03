import { DECREASE_QUANTITY, GET_PRODUCTS, INCREASE_QUANTITY, UPDATE_PRODUCTS } from "../actions/productsAction"

const initialState = {
  products: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
    }

    case INCREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload) {
            return {
              ...product,
              quantity: product.quantity + 1,
            }
          }
          return product
        }),
      }

    case DECREASE_QUANTITY:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload && product.quantity > 0) {
            return {
              ...product,
              quantity: product.quantity - 1,
            }
          }
          return product
        }),
      }

    default:
      return state
  }
}