import { useDispatch, useSelector } from 'react-redux';

import { setTerm } from '../../redux/actions';

import './searchPanel.scss';

const SearchPanel = () => {
    const { term } = useSelector(state => state.characters);
    const dispatch = useDispatch();

    return (
        <div className='search-panel'>
            <input
                className='search-panel__input'
                placeholder='Type a character`s name'
                type='text'
                value={term}
                onChange={(e) => dispatch(setTerm(e.target.value))} />
            <i className="search fas fa-search"></i>
        </div>
    )
}

export default SearchPanel;