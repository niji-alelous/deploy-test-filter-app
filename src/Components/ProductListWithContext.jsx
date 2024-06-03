import { useContext } from 'react'
import ProductContext from './productList.context'
import CartWithContext from './Cart/CartWithContext'

const ProductListWithContext = () => {

  const {
    cart,
    productList,
    addProductToCart,
    removeProductFromCart
  } = useContext(ProductContext)

  const getProductQuantity = (product) => {
    const foundProduct = cart.find((item) => item.id === product.id)
    return foundProduct ? foundProduct.quantity : 0
  }
  
  return (
    <>
      <div className='product-list'>
        {productList.map(product =>
          <div className='product-card' key={product.id}>
            <p>{product.brand}</p>
            <p>{product.name}</p>
            {product.isPromo && <div className='promo'>PROMO</div>}
            <div className='product-card-button'>
              <button onClick={() => removeProductFromCart(product.id)}>-</button>
              <span>{getProductQuantity(product)}</span>
              <button onClick={() => addProductToCart(product.id)}>+</button>
            </div>
          </div>
        )}
      </div>
      <CartWithContext />
    </>
  )
}

export default ProductListWithContext