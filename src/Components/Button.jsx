import PropTypes from 'prop-types'

const BrandFilterButton = (props) => {
  const { 
    brand,
    filters,
    onClick
  } = props

  // Active button display
  const isActiveFilter = () => filters.includes(brand)

  return (
    <button
      className={isActiveFilter() ? 'active' : ''}
      onClick={() => onClick(brand)}
    >
        {brand}
    </button>
  )
}

BrandFilterButton.propTypes = {
  brand: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.shape([])),
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

BrandFilterButton.defaultProps = {
  brand: '',
  filters: [],
  isActive: false,
  onClick: () => {},
}

export default BrandFilterButton