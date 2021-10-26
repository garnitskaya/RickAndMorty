import { Component } from 'react';

import './searchPanel.scss';

class SearchPanel extends Component {

    state = {
        term: ''
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onUpdateSearch(term);
    }

    render() {
        const { term } = this.state;
        return (
            <div className='search-panel'>
                <input
                    className='search-panel__input'
                    type='text'
                    value={term}
                    onChange={this.onUpdateSearch} />
                <i className="search fas fa-search"></i>
            </div>
        )
    }
}

export default SearchPanel;