import { useState } from 'react'
import { calculate } from '../../utils/index'

import { Link } from 'react-router-dom'

import './result.scss'

function TreeItem (props) {
    const [open, setOpen] = useState(true)
    const {name, quantity, restQt, ingredients} = props.item
    let label = `${name} x ${quantity}`
    if (restQt) label = label.concat(` [rest: ${restQt}]`)
    return (
        <div className='item'>
            <img src="images/items/ambar1.png" alt=""/>
            <span onClick={e => setOpen(!open)}>{open ? label : <del>{label}</del>}</span>
            <div className='list-item'>
                {open && ingredients?.map((item, index) => <TreeItem key={index} item={item} />)}
            </div>
        </div>
    )
}

function TreeView (props) {
    return (props.tree.map((item, i) => <TreeItem key={i} item={item}/>))
}

function Result (props) {

    const item = {
        'id': 35,
        'proficiency': 'Architecture',
        'name': 'Small Ship',
        'qtByProduction': 1,
        'ingredients': [
            {
                'proficiency': 'Blacksmith',
                'name': 'Anchor',
                'qtByProduction': 1,
                'quantity': 1,
                'ingredients': [
                    {
                        'name': 'Iron Ingot',
                        'quantity': 10,
                        'ingredients': [{ 'name': 'Rough Iron', 'quantity': 2 }]
                    }
                ]
            },
            {
                'proficiency': 'Tinkering',
                'name': 'Iron Nails',
                'qtByProduction': 3,
                'quantity': 60,
                'ingredients': [
                    {
                        'name': 'Iron Ingot',
                        'quantity': 1,
                        'ingredients': [{ 'name': 'Rough Iron', 'quantity': 2 }]
                    }
                ]
            },
            {
                'proficiency': 'Tailoring',
                'name': 'Line Cloth',
                'qtByProduction': 1,
                'quantity': 80,
                'ingredients': [{ 'name': 'Plant Fiber', 'quantity': 5 }]
            },
            {
                'proficiency': 'Tailoring',
                'name': 'Rope',
                'qtByProduction': 1,
                'quantity': 30,
                'ingredients': [{ 'name': 'Plant Fiber', 'quantity': 2 }]
            },
            {
                'proficiency': 'Carpentry',
                'name': 'Steering Wheel',
                'qtByProduction': 1,
                'quantity': 1,
                'ingredients': [
                    {
                        'name': 'Iron Ingot',
                        'quantity': 2,
                        'ingredients': [{ 'name': 'Rough Iron', 'quantity': 2 }]
                    },
                    {
                        'proficiency': 'Tinkering',
                        'name': 'Iron Nails',
                        'qtByProduction': 3,
                        'quantity': 10,
                        'ingredients': [
                            {
                                'name': 'Iron Ingot',
                                'quantity': 1,
                                'ingredients': [
                                    { 'name': 'Rough Iron', 'quantity': 2 }
                                ]
                            }
                        ]
                    },
                    {
                        'proficiency': 'Tailoring',
                        'name': 'Rope',
                        'qtByProduction': 1,
                        'quantity': 1,
                        'ingredients': [{ 'name': 'Plant Fiber', 'quantity': 2 }]
                    },
                    { 'name': 'Stone', 'quantity': 4 },
                    { 'name': 'Wood', 'quantity': 8 }
                ]
            },
            {
                'proficiency': 'Carpentry',
                'name': 'Wood Plank',
                'qtByProduction': 1,
                'quantity': 170,
                'ingredients': [{ 'name': 'Wood', 'quantity': 4 }]
            }
        ]
    }   

    item.quantity = 7

    calculate(item)

    return (
    <div className='container'>
        <div className='result-container'>
            <div id='result-tree-view'><TreeView tree={[item]}/></div>
            <div><Link to='/'>Back</Link></div>
        </div>
    </div>
    )
}

export default Result