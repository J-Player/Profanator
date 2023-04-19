import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './calculator.scss'

import { calculate } from '../../utils/index'

function Calculator() {
  
  const [proficiencies, setProficiencies] = useState([])
  const [items, setItems] = useState({})
  const [quantity, setQuantity] = useState('')
  
  const [proficiency, setProficiency] = useState('DEFAULT')
  const [item, setItem] = useState('DEFAULT')
  
  const [isLoadingProficiencies, setLoadingProficiencies] = useState(true)
  
  const fetchedDatas = useRef(false)
  
  const itemSelect = useRef(null)
  const quantityInput = useRef(null)

  const navigate = useNavigate()

  const fetchDatas = async () => {
    const URL = 'http://localhost:3000'
    const p1 = fetch(`${URL}/proficiencies`)
    .then(response => {
      if (response.ok) return response.json()
      throw response
    })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(err => {
      console.error(err)
    })
    const p2 = fetch(`${URL}/items`)
    .then(response => {
      if (response.ok) return response.json()
      throw response
    })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(err => {
      console.error(err)
    })
    return Promise.all([p1, p2])
  }
  
  useEffect(() => {
    if (fetchedDatas.current) return
    fetchedDatas.current = true
    fetchDatas().then(datas => {
      const obj = {}
      setProficiencies(datas[0].map(p => {
        obj[p.name] = []
        return p
      }))
      datas[1]
      .filter(i => i.proficiency)
      .forEach(i => obj[i.proficiency].push({id: i.id, name: i.name}))
      setItems(obj)
      setLoadingProficiencies(false)
    })
  }, [])
  
  useEffect(() => {
    if (proficiency === 'DEFAULT') return
    setItem(itemSelect.current.value)
  }, [proficiency])
  
  const handleWheel = (e) => {
    const node = e.target
    if (node.hasFocus) {
      return
    }
    switch (node.id) {
      case 'proficiencies':
      case 'items':
      let index = undefined
      if (e.deltaY < 0 && node.selectedIndex > 1) {
        index = Math.max(node.selectedIndex - 1, 0)
      }
      if (e.deltaY > 0 && node.selectedIndex < node.options.length - 1) {
        index = Math.min(node.selectedIndex + 1, node.length - 1)
      }
      if (!!!index) return
      const newValue = node.options[index].value
      node.id === 'proficiencies' ? setProficiency(newValue) : setItem(newValue)
      break
      case 'quantity':
      const min = parseInt(e.target.min)
      const max = parseInt(e.target.max)
      const val = parseInt(e.target.value)
      let newQt = undefined
      if (e.deltaY < 0) {
        newQt = !isNaN(val) ? (val < max ? val + 1 : max) : min
      }
      if (e.deltaY > 0) {
        newQt = !isNaN(val) && val > min ? val - 1 : min
      }
      setQuantity(newQt)
      break
    }
  }
  
  const handleInput = (e) => {
    const min = parseInt(e.target.min)
    const max = parseInt(e.target.max)
    const val = e.target.value
    let value = val.replace(/\D/g, '')
    value = Math.round(value)
    if (value > max) value = max
    else if (value < min && !!!quantity) value = min
    else if (value === 0 && !!quantity) value = ''
    setQuantity(value)
    e.target.value = quantity
  }
  
  const handleClick = async (e) => {
    const URL = 'http://localhost:3000'
    const index = itemSelect.current.value
    const item = items[proficiency][index]
    console.log(`${URL}/items/${item.id}`)
    fetch(`${URL}/items/${item.id}`)
    .then(rs => rs.json())
    .then(i => {
      i.quantity = parseInt(quantity)
      calculate(i).then(result => {
        navigate('/result', {state: {data: {item: result}}})
      })
    })
  }

return (
  <div className='container'>
    <div className='main-container'>
    
    <div className='title-container'>
      <h1>Profanator</h1>
    </div>
    
    <div className='image-container'>
      <img src="images/items/ambar.png" alt="" srcset=""/>
    </div>
    
    <div className='form-container'>
      <label htmlFor='proficiencies'>Proficiency:</label>
      <select id='proficiencies' value={proficiency} onWheel={e => handleWheel(e)} onChange={e => setProficiency(e.target.value)}>
      <option value='DEFAULT' disabled>Choose a proficiency</option>
      {
        isLoadingProficiencies ? <option disabled>Loading...</option> :
        proficiencies.map(p => (<option key={p.id} value={p.name}>{p.name}</option>))
      }
      </select>
    </div>
    
    <div className='form-container'>
      <label htmlFor='items'>Item:</label>
      <select id='items' ref={itemSelect} value={item} disabled={proficiency === 'DEFAULT'} onWheel={e => handleWheel(e)} onChange={e => setItem(e.target.value)}>
      {
        proficiency === 'DEFAULT' ? <option value='DEFAULT' disabled>Choose a proficiency first</option> :
        <>
        <option value='DEFAULT' disabled>Choose a item</option>
        {items[proficiency].map((i, index) => (<option key={index} value={index}>{i.name}</option>))}
        </>
      }
      </select>
    </div>
    
    <div className='form-container'>
      <label htmlFor='quantity'>Quantity:</label>
      <input type='number' ref={quantityInput} id='quantity' placeholder='Quantity here' value={quantity} min={1} max={999999} onInput={e => handleInput(e)} onWheel={e => handleWheel(e)}/>
    </div>
    
    <div>
      <button disabled={proficiency === 'DEFAULT' || item === 'DEFAULT' || !quantity} onClick={e  => handleClick(e)}>Calculate</button>
    </div>
    
    </div>
  </div>)
}

export default Calculator