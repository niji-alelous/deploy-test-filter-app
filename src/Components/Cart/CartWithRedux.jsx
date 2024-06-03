import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../actions/cartAction'


const CartWithRedux = () => {
  
  const dispatch = useDispatch()
  const cart = useSelector((state) => _.get(state, 'cartReducer.product', []))

  const cartQuantities = () => {
    // Utiliser reduce pour additionner les quantités
    return cart.reduce((somme, element) => somme + element.quantity, 0)
  }

  return (
    <div className='cart'>
      <div className='cart-clear'>
        <button onClick={() => dispatch(clearCart())}>Vider le panier</button>
      </div>
      <div className='cart-info'>
        <p>Panier Redux: {cartQuantities()}</p>
      </div>
    </div>
  )
}

CartWithRedux.propTypes = {
  clearCart: PropTypes.func,
  totalQuantityInCart: PropTypes.number,
}

CartWithRedux.defaultProps = {
  clearCart: () => {},
  totalQuantityInCart: 0
}

export default CartWithRedux