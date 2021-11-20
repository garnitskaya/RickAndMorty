import { useState } from 'react';

import './searchPanel.scss';

const SearchPanel = (props) => {
    const [term, setTerm] = useState('');

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setTerm(term)
        props.onUpdateSearch(term);
    }

    return (
        <div className='search-panel'>
            <input
                className='search-panel__input'
                placeholder='Type a character`s name'
                type='text'
                value={term}
                onChange={onUpdateSearch} />
            <i className="search fas fa-search"></i>
        </div>
    )
}

export default SearchPanel;