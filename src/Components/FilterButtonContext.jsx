import PropTypes from 'prop-types'
import { useContext } from 'react'
import ProductContext from './productList.context'

const BrandFilterButtonContext = () => {
  const {
    handleFilter,
    filterBrands,
    isActiveFilter
  } = useContext(ProductContext)

  return (
    <div className='filter-button-list'>
      <h2>Filter CONTEXT</h2>
      {filterBrands.map(brand => (
        <button
          key={brand}
          className={isActiveFilter(brand) ? 'active' : ''}
          onClick={() => handleFilter(brand)}
        >
            {brand}
        </button>
      ))}
  </div>
  )
}

BrandFilterButtonContext.propTypes = {
  brand: PropTypes.string,
  filterBrands: PropTypes.arrayOf(PropTypes.shape([])),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

BrandFilterButtonContext.defaultProps = {
  brand: '',
  filterBrands: [],
  isActive: false,
  onClick: () => {},
}

export default BrandFilterButtonContext