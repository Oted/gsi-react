import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown'

export default class SearchBar extends Component {
    search(e) {
        if (e.which === 13) {
            this.props.actions.search();
        }
    }

    onChange(e) {
        this.props.actions.setSearchText(e.target.value);
    }

    getInPlaceholder() {
        const activeTypes = this.props.search['in'].filter(type => {
            return type.active;
        });

        if (activeTypes.length === this.props.search['in'].length) {
            return 'EVERYTHING';
        }

        return activeTypes.length === 1 ? activeTypes[0].type : activeTypes.length + ' TYPES'
    }

    getFromPlaceholder() {
        const activeTypes = this.props.search['from'].filter(type => {
            return type.active;
        });

        if (activeTypes.length === this.props.search['from'].length) {
            return 'THE INTERNET';
        }

        return activeTypes.length === 1 ? activeTypes[0].type : activeTypes.length + ' PLACES'
    }

    render() {
        const { search, actions } = this.props;

        return (
            <div className='search-bar'>
                <h5 className='search-text'> SEARCH </h5>
                <DropDown key={'in'} list={search['in']} {...actions} {...{name : 'in', placeholder : this.getInPlaceholder()}} />
                <h5 className='search-text'> ABOUT </h5>
                <input
                    className='search-text search-input'
                    placeholder='SOMETHING'
                    autoFocus='true'
                    onChange={::this.onChange}
                    onKeyDown={::this.search}/>
                <h5 className='search-text'> FROM </h5>
                <DropDown key={'from'} list={search['from']} {...actions} {...{name : 'from', placeholder : this.getFromPlaceholder()}} />
                <div className="search-button">
                    <i className="ion-ios-search-strong"></i>
                </div>
            </div>
        );
    }
}
