import { useContext } from "react"
import ProductContext from "../productList.context"

const CartWithContext = () => {
  const {
    clearCartContext,
    totalQuantityInCart
  } = useContext(ProductContext)

  return (
    <div className='cart'>
      <div className='cart-clear'>
        <button onClick={clearCartContext}>Vider le panier</button>
      </div>
      <div className='cart-info'>
        <p>Panier: {totalQuantityInCart}</p>
      </div>
    </div>
  )
}


export default CartWithContext