import { useEffect, useState } from 'react'
import './main.styl'
import { productListData } from './product-list.data'
import BrandFilterButton from './Components/Button'
import { getUniqueFilterBrands } from './services/productService'
import ProductListWithRedux from './Components/ProductListWithRedux'
import ProductListWithContext from './Components/ProductListWithContext'
import { ProductContextProvider } from './Components/productList.context'
import BrandFilterButtonContext from './Components/FilterButtonContext'
import SortBrandButton from './Components/SortBrandButton'

function App() {
  const [filters, setFilters] = useState([])
  const [filterBrands, setFilterBrands] = useState([])
  const [products, setProducts] = useState(productListData)

  // Set Brand filter button
  useEffect(() => {
    const uniqueBrands = getUniqueFilterBrands(productListData).map(brand => brand)
    setFilterBrands(uniqueBrands)
  }, [])

  const productList = products.filter(product => filters.length === 0 || filters.includes(product.brand))

  // Fonction filtre marques 
  const handleFilter = (brand) => {
    if (filters.includes(brand)) {
      setFilters(filters.filter(item => item !== brand))
    } else {
      setFilters([...filters, brand])
    }
  }

  // Fonction de trie
  const handleSortChange = (e) => {
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
    <ProductContextProvider>
      <div className='container'>
        <h2>With REDUX</h2>
        <div className='filter-container'>
          <div className='filter-title'>FILTERS</div>
          <div className='filter-button-list'>
            <h2>FILTER REDUX</h2>
            {filterBrands.map(brand => (
              <BrandFilterButton
                key={brand}
                brand={brand}
                filters={filters}
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
        <ProductListWithRedux
          products={productList}
        />

        <h2>With CONTEXT</h2>
        <BrandFilterButtonContext />
        <SortBrandButton />
        <ProductListWithContext />
      </div>
    </ProductContextProvider>
  )
}

export default App
