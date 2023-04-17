class Ingredient {
    /**
     * @param {Object} props
     * @param {Number} props.id
     * @param {String} props.product
     * @param {String} props.name
     * @param {Number} props.quantity
     */
    constructor(props) {
        this.id = props.id
        this.product = props.product
        this.name = props.name
        this.quantity = props.quantity
    }

}

module.exports = Ingredient