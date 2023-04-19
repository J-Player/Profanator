import { useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import './result.scss'

function TreeItem (props) {
    const [showIngredients, setShowIngredients] = useState(true)
    const {name, quantity, restQt, ingredients} = props.item
    let label = `${name} x ${quantity}`
    if (restQt) label = label.concat(` [rest: ${restQt}]`)
    const srcImage = `images/items/${name.toLowerCase().replace(' ', '_')}.png`
    return (
        <div className='item-container'>
            <div className='item' onClick={e => setShowIngredients(!showIngredients)}>
                <div className='item-image'><img src={srcImage} onError={e => e.target.style.display = 'none'} /></div>
                <span>{showIngredients ? label : <del>{label}</del>}</span>
            </div>
            <div className='list-item'>
                {showIngredients && ingredients?.map((item, index) => <TreeItem key={index} item={item} />)}
            </div>
        </div>
    )
}
    
    function TreeView (props) {
        return (props.tree.map((item, i) => <TreeItem key={i} item={item}/>))
    }
    
    function Result() {
        const location = useLocation()
        const item = location.state.data.item
        return (
            <div className='container'>
                <div className='main-container'>
                    <div className='tree-view-container'>
                    <TreeView tree={[item]}/>
                    </div>
                    <div>
                        <button><Link to='/'>Back</Link></button>
                    </div>
                </div>
            </div>
            )
        }
        
export default Result