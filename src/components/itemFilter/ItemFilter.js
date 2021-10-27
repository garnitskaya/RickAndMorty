import './itemFilter.scss';
import { Component } from 'react';

class ItemFilter extends Component {

    state = {
        value: 'all'
    }

    species = [
        { value: 'all', label: 'All' },
        { value: 'human', label: 'Human' },
        { value: 'alien', label: 'Alien' },
        { value: 'humanoid', label: 'Humanoid' },
        { value: 'robot', label: 'Robot' },
        { value: 'animal', label: 'Animal' },
        { value: 'disease', label: 'Disease' },
        { value: 'mythologicalCreature', label: 'Mythological Creature' },
        { value: 'poopybutthole', label: 'Poopybutthole' },
        { value: 'cronenberg', label: 'Cronenberg' },
        { value: 'unknown', label: 'Unknown' },
    ]

    onChangeSelect = (e) => {
        this.setState({
            value: e.target.value
        })
        this.props.onFilterChange(e.target.value)
    }

    render() {
        const { filter } = this.props;

        return (
            <select
                value={this.state.value}
                onChange={this.onChangeSelect}
                className='item-filter'  >
                {
                    this.species.map(({ value, label }) => {
                        const isActive = filter === value;
                        const clazz = isActive ? 'active' : null;
                        return (
                            <option
                                className={`item-filter__option ${clazz}`}
                                key={value}
                                value={value}>
                                {label}
                            </option>
                        )
                    })
                }

            </select >
        )
    }
}

export default ItemFilter;