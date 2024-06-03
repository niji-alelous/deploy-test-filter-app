import PropTypes from 'prop-types'

const Cart = (props) => {
  const { 
    clearCart,
    totalQuantityInCart
  } = props

  return (
    <div className='cart'>
      <div className='cart-clear'>
        <button onClick={clearCart}>Vider le panier</button>
      </div>
      <div className='cart-info'>
        <p>Panier: {totalQuantityInCart}</p>
      </div>
    </div>
  )
}

Cart.propTypes = {
  clearCart: PropTypes.func,
  totalQuantityInCart: PropTypes.number,
}

Cart.defaultProps = {
  clearCart: () => {},
  totalQuantityInCart: 0
}

export default Cart