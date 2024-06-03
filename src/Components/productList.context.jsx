import { createContext, useEffect, useLayoutEffect, useState } from "react"
import PropTypes from 'prop-types'
import { productListData } from "../product-list.data"
import _ from "lodash"
import { getUniqueFilterBrands } from "../services/productService"

const ProductContext = createContext({
  addProductToCart: () => {},
  cart: [],
  clearCartContext: () => {},
  isActiveFilter: () => {},
  filterBrands: [],
  handleFilter: () => {},
  handleSortChangeContext: () => {},
  productList: [],
  removeProductFromCart: () => {},
  totalQuantityInCart: null
})

export default ProductContext

const ProductContextProvider = ({ children }) => {
  const [filters, setFilters] = useState([])
  const [filterBrands, setFilterBrands] = useState([])
  const [products, setProducts] = useState(productListData)
  const [cart, setCart] = useState([])

  // Set Brand filter button
  useEffect(() => {
    const uniqueBrands = getUniqueFilterBrands(productListData).map(brand => brand)
    setFilterBrands(uniqueBrands)
  }, [])

  // Get cart data from localStorage on component mount
  useLayoutEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart && !_.isEmpty(savedCart)) {
      setCart(JSON.parse(savedCart))
    }
    console.log('Storage saved cart:', savedCart)
  }, [])

  // Set cart data on local storage when cart is update
  useEffect(() => {
    console.log('Panier local storage:', cart)
    if (!_.isEmpty(cart)) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [ cart ])
  
  // Card Add quantity function
  const addProductToCart = (productId) => {
    const updatedCart = [...cart] // Fait une copie du panier existant
    const productIndex = updatedCart.findIndex(item => item.id === productId)
  
    if (productIndex !== -1) { // Si le produit existe déjà dans le panier
      updatedCart[productIndex].quantity += 1 // Incrémente la quantité
    } else {
      const productToAdd = products.find(product => product.id === productId)
      if (productToAdd) {
        updatedCart.push({ ...productToAdd, quantity: 1 }) // Ajoute le produit avec quantité 1
      }
    }
  
    setCart(updatedCart) // Met à jour le panier
  }

  // Card remove or clear quantity function
  const removeProductFromCart = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
  
    const updatedCartWithoutZeroQuantities = updatedCart.filter(item => item.quantity > 0) // Filtrer les articles avec une quantité supérieure à 0
  
    setCart(updatedCartWithoutZeroQuantities)
    localStorage.setItem('cart', JSON.stringify(updatedCartWithoutZeroQuantities)) // Mettre à jour le local storage avec le panier mis à jour
  
  }

  // Fonction Clear cart
  const clearCartContext = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const productList = products.filter(product => filters.length === 0 || filters.includes(product.brand))
  const totalQuantityInCart = cart.reduce((total, item) => total + item.quantity, 0)

  // Fonction filtre marques 
  const handleFilter = (brand) => {
    if (filters.includes(brand)) {
      setFilters(filters.filter(item => item !== brand))
    } else {
      setFilters([...filters, brand])
    }
  }

  // Active button display
  const isActiveFilter = (brand) => filters.includes(brand)

  // Fonction de trie
  const handleSortChangeContext = (e) => {
    const option = e.target.value;
    let sortedProducts = [...products]

    if (option === 'alphabetical') {
      sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand))
    } else if (option === 'reverseAlphabetical') {
      sortedProducts.sort((a, b) => b.brand.localeCompare(a.brand))
    } else if (option === 'promotionFirst' || option === 'default') {
      sortedProducts.sort((a, b) => {
        if (!a.isPromo && b.isPromo) {
          return 1
        } else if (a.isPromo && !b.isPromo) {
          return -1
        } else {
          return 0
        }
      })
    }

    setProducts(sortedProducts)
  }

  return (
    <ProductContext.Provider value={{
      addProductToCart,
      cart,
      clearCartContext,
      filterBrands,
      handleFilter,
      handleSortChangeContext,
      isActiveFilter,
      productList,
      removeProductFromCart,
      totalQuantityInCart
    }}>
      { children }
    </ProductContext.Provider>
  )
}

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { ProductContextProvider }