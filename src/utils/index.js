/**
* @param {Item} item
*/
export const calculate = async (item) => {
    if (item.qtByProduction > 1) {
      if (item.quantity < item.qtByProduction) {
        item.restQt = item.qtByProduction - item.quantity
        item.quantity = item.qtByProduction
      } else if ((item.quantity % item.qtByProduction) != 0) {
        const newQuantity = Math.trunc(item.quantity / item.qtByProduction + 1) * item.qtByProduction
        item.restQt = newQuantity - item.quantity
        item.quantity = newQuantity
      }
    }
    for (let ingredient of item.ingredients) {
      ingredient.quantity *= item.quantity
      if (item.qtByProduction) ingredient.quantity /= item.qtByProduction
      if (ingredient.ingredients?.length > 0) calculate(ingredient)
    }
    return item
}

export const removeNullUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
