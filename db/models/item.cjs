class Item {
    /**
    * @param {Object} props
    * @param {Number} props.id
    * @param {String} props.proficiency
    * @param {String} props.name
    * @param {Number} props.qtByProduction
    * @param {Number} props.quantity
    * @param {Number} props.restQt
    * @param {Item[]} props.ingredients
    */
    constructor(props) {
        this.id = props.id
        this.proficiency = props.proficiency
        this.name = props.name
        this.qtByProduction = props.qtByProduction
        this.quantity = props.quantity
        this.restQt = props.restQt
        this.ingredients = props.ingredients
        this.version = props.version
    }
    
}

module.exports = Item