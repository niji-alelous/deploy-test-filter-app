  // Fonction unique brand list
export const getUniqueFilterBrands = (unsortedProducts) => {
  const allBrands = unsortedProducts.map(product => product.brand)
  const uniqueBrands = allBrands.filter((brand, index) => allBrands.indexOf(brand) === index)
  return uniqueBrands
}