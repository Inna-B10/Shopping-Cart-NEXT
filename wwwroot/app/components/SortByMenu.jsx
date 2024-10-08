import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './SortByMenu.module.css'

SortByMenu.propTypes = {
	selectedSortBy: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.string,
		label: PropTypes.string,
	}).isRequired,
	setSelectedSortBy: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
}

export default function SortByMenu({
	selectedSortBy,
	setSelectedSortBy,
	options,
}) {
	const handleOptionChange = e => {
		setSelectedSortBy(e)
	}
	return (
		<Select
			name='sortBy'
			closeMenuOnSelect={true}
			defaultValue={[options[1]]}
			isClearable={false}
			isSearchable={false}
			options={options}
			className={styles.sortByContainer}
			onChange={handleOptionChange}
			classNames={{
				control: state =>
					state.isFocused
						? state.menuIsOpen
							? styles.controlListOpen
							: styles.controlFocused
						: styles.control,
				menu: state => styles.list,
				valueContainer: state => styles.valueContainer,
				singleValue: state => styles.singleValue,
				indicatorsContainer: state => styles.indicatorsContainer,
				option: state =>
					state.isFocused ? styles.optionFocused : styles.option,
			}}
		/>
	)
}
