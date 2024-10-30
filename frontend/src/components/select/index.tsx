import { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const Select = ({ children, ...props }: SelectProps) => {
	return (
		<select
			className="border-2 border-light-gray px-2 py-1 outline-none disabled:cursor-not-allowed disabled:opacity-50 [&:not(:disabled)]:cursor-pointer [&:not(:disabled)]:hover:border-orange [&:not(:disabled)]:focus:border-orange"
			{...props}>
			{children}
		</select>
	)
}

// const Select = styled.select`
// 	border: 2px solid ${Color.LIGHT_GRAY};
// 	outline: none;
// 	-moz-appearance: none; /* Firefox */
// 	-webkit-appearance: none; /* Safari and Chrome */
// 	appearance: none;

// 	//Arrow
// 	background-image: url('arrow.svg');
// 	background-repeat: no-repeat;
// 	background-position: right 0.7rem top 50%;
// 	background-size: 0.65rem auto;

// 	// TODO: ESTILIZAR A DROP-DOWN LIST

// 	&:disabled {
// 		cursor: not-allowed;
// 		opacity: 0.5;
// 	}
// 	&:not(:disabled) {
// 		&:hover,
// 		&:focus {
// 			border-color: ${Color.ORANGE};
// 			cursor: pointer;
// 		}
// 	}
// `

export default Select
