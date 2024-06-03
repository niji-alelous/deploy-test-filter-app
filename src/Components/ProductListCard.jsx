import PropTypes from 'prop-types'
import Cart from './Cart/Cart'

const ProductList = (props) => {
  const { 
    cart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    products,
    totalQuantityInCart
  } = props
  
  return (
    <>
      <div className='product-list'>
        {products.map(product =>
          <div className='product-card' key={product.id}>
            <p>{product.brand}</p>
            <p>{product.name}</p>
            {product.isPromo && <div className='promo'>PROMO</div>}
            <div className='product-card-button'>
              <button onClick={() => decreaseQuantity(product.id)}>-</button>
              <span>{(cart.find(item => item.id === product.id) || { quantity: 0 }).quantity}</span>
              <button onClick={() => increaseQuantity(product.id)}>+</button>
            </div>
          </div>
        )}
      </div>
      <Cart
        clearCart={clearCart}
        totalQuantityInCart={totalQuantityInCart}
      />
    </>
  )
}

ProductList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape([])),
  clearCart: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.shape([])),
  totalQuantityInCart: PropTypes.number
}

ProductList.defaultProps = {
  cart: [],
  clearCart: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  products: [],
  totalQuantityInCart: null
}

export default ProductList