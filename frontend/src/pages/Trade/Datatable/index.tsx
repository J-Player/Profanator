import ignoreIcon from '../../../assets/icons/ignore.svg'
import Trade from '../../../models/Trade'
import Pageable from '../../../types/Pageable'

interface DataTableProps {
	headers: string[]
	data: Trade[]
	pageable: Pageable
	sortFn: (value: string) => void
	extra?: Map<string, () => void>
}

const DataTable = ({ headers, data, pageable, sortFn, extra }: DataTableProps) => {
	const equals = (str1: string, str2: string) => str1.toLowerCase() === str2.toLowerCase()
	return (
		<table>
			<thead>
				<tr>
					{headers.map((value, i) => {
						return (
							<th
								key={i}
								onClick={e => sortFn(e.currentTarget.innerText.toLowerCase())}
								className={
									(pageable.sort && equals(pageable.sort.name, value) && `active ${pageable.sort?.direction}`) ||
									undefined
								}>
								{value}
							</th>
						)
					})}
					{extra && <th className="menu"></th>}
				</tr>
			</thead>
			<tbody>
				{data.map(value => {
					return (
						<tr key={value.id}>
							<td>
								<div>
									<img
										src={`items/${value.item.toLowerCase().replace(' ', '_')}.png`}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null
											currentTarget.src = 'items/ambar.png'
										}}
										alt=""
									/>
									{value.item}
								</div>
							</td>
							<td>{value.quantity}</td>
							<td>{value.price}</td>
							<td>{value.seller}</td>
							{extra && (
								<td>
									<div>
										<button>
											<img src={ignoreIcon} alt="Ignore User" />
										</button>
									</div>
								</td>
							)}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default DataTable
