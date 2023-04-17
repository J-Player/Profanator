const PROFICIENCIES = require('./proficiencies/index.cjs')
const ITEMS = require('./items/index.cjs')
const INGREDIENTS = require('./ingredients/index.cjs')

const Item = require('./models/item.cjs')

const removeNullUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

const fs = require('fs')
const path = require('path')

const checkItems = () => {
    const itemNames = ITEMS.map(item => item.name.toLowerCase())
    const duplicates = findDuplicates(itemNames)
    if (duplicates.length) {
        throw Error(`Duplicate Item detected! (${duplicates})`)
    }
    const proficiencyNames = PROFICIENCIES.map(proficiency => proficiency.name.toLowerCase())
    for (const item of ITEMS) {
        if (item.proficiency && !proficiencyNames.includes(item.proficiency.toLowerCase())) {
            throw Error(`The Proficiency "${item.proficiency}" does not exists.`)
        }
    }
    return true
}

const checkIngredients = () => {
    const ingredientNames = INGREDIENTS.map(i => `${i.product.toLowerCase()}_${i.name.toLowerCase()}`)
    const duplicates = findDuplicates(ingredientNames)
    if (duplicates.length) {
        throw Error(`Duplicate Ingredient detected! (${duplicates})`)
    }
    const itemNames = ITEMS.map(i => i.name.toLowerCase())
    for (const ingredient of INGREDIENTS) {
        const {product, name, quantity} = ingredient
        if (product && !itemNames.includes(product.toLowerCase())) {
            throw Error(`The property Product (${product}) does not exists.`)
        }
        if (name && !itemNames.includes(name.toLowerCase())) {
            throw Error(`The property Name (${name}) does not exists.`)
        }
        if (!product) throw Error(`The Product property are required.`)
        if (!name) throw Error(`The Name property are required.`)
        if (!quantity) throw Error(`The Quantity property are required.`)
    }
    return true
}

/**
* 
* @param {String} itemName 
* @returns {Promise<Item[]>}
*/
const getIngredientsOf = async (itemName) => {
    const itemList = []
    for (const ingredient of INGREDIENTS) {
        if (itemName.toLowerCase() === ingredient.product.toLowerCase()) {
            for (const item of ITEMS) {
                if (ingredient.name.toLowerCase() === item.name.toLowerCase()) {
                    itemList.push(removeNullUndefined(new Item(({
                        proficiency: item.proficiency,
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        qtByProduction: item.qtByProduction,
                        ingredients: await getIngredientsOf(ingredient.name)
                    }))))
                    break
                }
            }
        }
    }
    return itemList.length ? itemList : undefined
}

const main = async ({debug = false}) => {
    PROFICIENCIES.sort()
        .map((proficiency, index) => {
            proficiency.id = index
            return proficiency
        })
    ITEMS.sort((a, b) => a.proficiency === b.proficiency ?
            a.name < b.name ? -1 : 1 :
            a.proficiency < a.proficiency ? -1 : 1)
        .map((item, index) => {
            item.id = index
            return item
        })
    INGREDIENTS.sort((a, b) => a.product === b.product ?
            a.name < b.name ? -1 : 1 :
            a.product < a.product ? -1 : 1)
        .map((ingredient, index) => {
            ingredient.id = index
            return ingredient
        })
    const itemsChecked = checkItems()
    const ingredientsChecked = checkIngredients()
    if (itemsChecked && ingredientsChecked) {
        for (const item of ITEMS) {
            item.ingredients = await getIngredientsOf(item.name)
        }
        if (debug) {
            let itemsWithProficiency = 0
            for (const proficiency of PROFICIENCIES) {
                const size = ITEMS.filter(item => item.proficiency === proficiency.name).length
                itemsWithProficiency += size
                console.log(`${proficiency.name}'s items: ${size}`)
            }
            console.log(`Others items: ${ITEMS.length - itemsWithProficiency}`)
            console.log(`TOTAL ITEMS: ${ITEMS.length}`)
        }
        const datas = JSON.stringify({proficiencies: PROFICIENCIES, items: ITEMS})
        fs.writeFileSync(path.join(__dirname, 'db.json'), datas, {encoding: 'utf-8'})
        return datas
    }
}

main({debug: true})