import ProductContext from './productList.context'
import { useContext } from 'react'

const SortBrandButton = () => {
  const {
    handleSortChangeContext
  } = useContext(ProductContext)

  return (
    <div className='sort-selector'>
      <select onChange={handleSortChangeContext}>
        <option value="default">Tri par défaut</option>
        <option value="alphabetical">Tri par ordre alphabétique</option>
        <option value="reverseAlphabetical">Tri par ordre alphabétique inversé</option>
        <option value="promotionFirst">Promotions en premier</option>
      </select>
    </div>
  )
}

export default SortBrandButton