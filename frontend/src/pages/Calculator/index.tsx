import { FormEvent, useEffect, useState } from 'react'
import Form from '../../components/form'
import Input from '../../components/input'
import Button from '../../components/button'
import Item from '../../models/Item'
import Select from '../../components/select'
import calculate from '../../utils/calculator'
import axios, { ENDPOINTS } from '../../api/axios'
import Proficiency from '../../models/Proficiency'
import { Page } from '../../types/Page'
import ItemService from '../../services/ItemService'
import { cn } from '../../utils/cn'
import './index.css'
import { Card } from './card'
import { Page as PageComponent } from '../../components/page'

const Calculator = ({ className }: { className?: string }) => {
	const [proficiencies, setProficiencies] = useState<string[]>([])
	const [items, setItems] = useState<{ [x: string]: string[] }>({})

	const [proficiency, setProficiency] = useState<string | null>()
	const [itemName, setItemName] = useState<string | null>()
	const [quantity, setQuantity] = useState<number>()
	const [result, setResult] = useState<Item | null>(null)

	const itemService = new ItemService(axios)

	const handleQuantity = (e: FormEvent<HTMLInputElement>) => {
		e.currentTarget.value = e.currentTarget.value.replace(/\D/, '')
		setQuantity(parseInt(e.currentTarget.value))
	}

	const handleCalculate = async () => {
		if (itemName) {
			const item = await itemService.buildItem(itemName)
			if (item) {
				item.quantity = quantity
				const itemCalculated = calculate(item)
				console.log(itemCalculated)
				setResult(itemCalculated)
			}
		}
	}

	useEffect(() => {
		const controller = new AbortController()
		const fetchProficiencies = async () => {
			try {
				const response = await axios.get<Page<Proficiency>>(`${ENDPOINTS.PROFICIENCY}/all`, {
					signal: controller.signal
				})
				if (response.data.content) {
					const list = response.data.content.map(p => p.name)
					setProficiencies(list)
					localStorage.setItem('proficiencies', JSON.stringify(list))
				}
			} catch (error) {
				console.error(error)
			}
		}
		const data = localStorage.getItem('proficiencies')
		if (data) setProficiencies(JSON.parse(data))
		else fetchProficiencies()
		return () => {
			controller.abort()
		}
	}, [])

	useEffect(() => {
		const controller = new AbortController()
		const fetchItems = async () => {
			try {
				if (proficiencies.length > 0) {
					for (const proficiency of proficiencies) {
						const response = await axios.get<Page<Item>>(`${ENDPOINTS.ITEM}/all`, {
							params: { proficiency: proficiency },
							signal: controller.signal
						})
						if (response.data.content) {
							console.log(response.data.content.length)
							setItems(prev => {
								prev[proficiency] = response.data.content.map(i => i.name)
								return prev
							})
						}
					}
					localStorage.setItem('items', JSON.stringify(items))
				}
			} catch (error) {
				console.error(error)
			}
		}
		const data = localStorage.getItem('items')
		if (data) setItems(JSON.parse(data))
		else fetchItems()
		return () => {
			controller.abort()
		}
	}, [proficiencies])

	const handleBack = () => {
		setResult(null)
		setProficiency(null)
		setItemName(null)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<PageComponent className={cn('calculator-section', className)} title="Calculator">
			<h1>Calculator</h1>
			{!result ? (
				<Form onSubmit={e => e.preventDefault()}>
					<div>
						<label htmlFor="proficiency">Proficiency:</label>
						<Select
							name="proficiency"
							id="proficiency"
							onChange={e => setProficiency(e.currentTarget.value)}
							disabled={proficiencies.length === 0}
							defaultValue={'default'}>
							{!proficiency && (
								<option value="default" disabled>
									Choose a proficiency
								</option>
							)}
							{proficiencies.map((v, i) => {
								return <option key={i}>{v}</option>
							})}
						</Select>
					</div>
					<div>
						<label htmlFor="item">Item:</label>
						<Select
							name="item"
							id="item"
							onChange={e => {
								setItemName(e.currentTarget.value)
							}}
							disabled={!proficiency}
							defaultValue={'default'}>
							{!proficiency ? (
								<option value="default" disabled>
									Choose a proficiency first
								</option>
							) : (
								<>
									{!itemName && (
										<option value="default" disabled>
											Choose a item
										</option>
									)}
									{items[proficiency].map((v, i) => {
										return <option key={i}>{v}</option>
									})}
								</>
							)}
						</Select>
					</div>
					<div>
						<label htmlFor="quantity">Quantity:</label>
						<Input
							type="number"
							name="quantity"
							id="quantity"
							min={1}
							step={1}
							onChangeCapture={e => handleQuantity(e)}
							placeholder="Quantity"
						/>
					</div>
					<div>
						<Button $primary type="submit" onClick={handleCalculate} disabled={!proficiency || !itemName || !quantity}>
							Calculate
						</Button>
					</div>
				</Form>
			) : (
				<>
					<div className="result-wrapper">
						<div>
							<Card item={result} />
						</div>
						<Button onClick={handleBack}>Back</Button>
					</div>
				</>
			)}
		</PageComponent>
	)
}

export default Calculator
