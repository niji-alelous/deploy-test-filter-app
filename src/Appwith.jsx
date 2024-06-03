import { useEffect, useState } from 'react'
import './main.styl'
import BrandFilterButton from './Components/Button'
import { productListData } from './product-list.data'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import ProductList from './Components/ProductList'
import { decreaseQuantity, increaseQuantity, updateProducts } from './actions/productsAction'

function App() {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState([])
  const [cart, setCart] = useState([])
  const productsRedux = useSelector(state => _.get(state, 'productsReducer.products', []))
  console.log('ProductsRedux:', productsRedux)
  // Effect to retrieve cart data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    console.log('Storage saved cart:', savedCart)
  }, [])
  
  useEffect(() => {
    console.log('Panier:', cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [ cart ])
  
  const [products, setProducts] = useState(productListData)
  // Sans Redux
  // const unsortedProducts = [...products]
  // Avec Redux
  const unsortedProducts = [...productsRedux]
  // const productList = products.filter(product => {
  //   if (filters.length === 0) return true
  //   return filters.includes(product.brand)
  // })
  
  // Sans redux 
  // const productList = products.filter(product => filters.length === 0 || filters.includes(product.brand))
  // Avec Redux
  const productList = !_.isEmpty(productsRedux) && (productsRedux.filter(product => filters.length === 0 || filters.includes(product.brand)))

  // const increaseQuantity = (productId) => {
  //   const updatedCart = [...cart] // Fait une copie du panier existant
  //   const productIndex = updatedCart.findIndex(item => item.id === productId)
  
  //   if (productIndex !== -1) { // Si le produit existe déjà dans le panier
  //     updatedCart[productIndex].quantity += 1 // Incrémente la quantité
  //   } else {
  //     const productToAdd = products.find(product => product.id === productId)
  //     if (productToAdd) {
  //       updatedCart.push({ ...productToAdd, quantity: 1 }) // Ajoute le produit avec quantité 1
  //     }
  //   }
  
  //   setCart(updatedCart) // Met à jour le panier
  // }

  // const decreaseQuantity = (productId) => {
  //   const updatedCart = cart.map(item =>
  //     item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
  //   )
  //   // Filtrer les articles avec une quantité supérieure à 0
  //   const updatedCartWithoutZeroQuantities = updatedCart.filter(item => item.quantity > 0)
  
  //   setCart(updatedCartWithoutZeroQuantities)
  //   // Mettre à jour le local storage avec le panier mis à jour
  //   localStorage.setItem('cart', JSON.stringify(updatedCartWithoutZeroQuantities))
  
  // }

  // ------ Fonctions Brand Filter Button
  // Fonction unique brand list
  const getUniqueFilterBrands = () => {
    const allBrands = unsortedProducts.map(product => product.brand)
    const uniqueBrands = allBrands.filter((brand, index) => allBrands.indexOf(brand) === index)
    return uniqueBrands
  }

  const filtersBrands = getUniqueFilterBrands().map(brand => brand)
  // Active button display
  const isActiveFilter = (brand) => filters.includes(brand)
  // Fonction filtre marques 
  const handleFilter = (brand) => {
    if (filters.includes(brand)) {
      setFilters(filters.filter(item => item !== brand))
    } else {
      setFilters([...filters, brand])
    }
  }

  // Fonctions Panier

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const totalQuantityInCart =
    cart.reduce((total, item) => total + item.quantity, 0)

  // Fonction de trie
  const handleSortChange = (e) => {
    const option = e.target.value;
    let sortedProducts = [...unsortedProducts]

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
    dispatch(updateProducts(sortedProducts))
  }

  return (
    <div className='container'>
      <div className='filter-container'>
        <div className='filter-title'>FILTERS</div>
        <div className='filter-button-list'>
          {filtersBrands.map(brand => (
            <BrandFilterButton
              key={brand}
              brand={brand}
              isActive={isActiveFilter(brand)}
              onClick={handleFilter}
            />
          ))}
        </div>
      </div>
      <div className='sort-selector'>
        <select onChange={handleSortChange}>
          <option value="default">Tri par défaut</option>
          <option value="alphabetical">Tri par ordre alphabétique</option>
          <option value="reverseAlphabetical">Tri par ordre alphabétique inversé</option>
          <option value="promotionFirst">Promotions en premier</option>
        </select>
      </div>
      <div className='product-list'>
        <ProductList 
          cart={cart}
          // decreaseQuantity={decreaseQuantityHandler}
          // increaseQuantity={increaseQuantityHandler}
          products={productList} 
        />
      </div>
      <div className='cart'>
        <div className='cart-clear'>
          <button onClick={clearCart}>Vider le panier</button>
        </div>
        <div className='cart-info'>
          <p>Panier: {totalQuantityInCart}</p>
        </div>
      </div>
    </div>
  )
}

export default App
