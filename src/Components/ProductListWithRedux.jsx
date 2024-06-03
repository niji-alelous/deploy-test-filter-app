import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addProducToCart, removeProducFromCart } from '../actions/cartAction'
import _ from 'lodash'
import CartWithRedux from './Cart/CartWithRedux'


const ProductListWithRedux = (props) => {
  const { 
    products
  } = props
  const dispatch = useDispatch()
  const productList= useSelector((state) => _.get(state, 'cartReducer.product', []))

  const getProductQuantity = (product) => {
    const foundProduct = productList.find((item) => item.id === product.id)
    return foundProduct ? foundProduct.quantity : 0
  }
  
  return (
    <>
      <div className='product-list'>
        {products.map(product =>
          <div className='product-card' key={product.id}>
            <p>{product.brand}</p>
            <p>{product.name}</p>
            {product.isPromo && <div className='promo'>PROMO</div>}
            <div className='product-card-button'>
              <button onClick={() => dispatch(removeProducFromCart(product))}>-</button>
              <span>{getProductQuantity(product)}</span>
              <button onClick={() => dispatch(addProducToCart(product))}>+</button>
            </div>
          </div>
        )}
      </div>
      <CartWithRedux />
    </>
  )
}

ProductListWithRedux.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape([])),
  decreaseQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.shape([]))
}

ProductListWithRedux.defaultProps = {
  cart: [],
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  products: []
}

export default ProductListWithRedux