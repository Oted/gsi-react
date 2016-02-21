import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown'

export default class SearchBar extends Component {
    render() {
        const { search, actions } = this.props;

        return (
            <div className='search-bar'>
                <h5 className='search-text'> SEARCH IN </h5>
                <DropDown key={'in'} list={search['in']} {...actions} {...{name : 'in', placeholder : 'EVERYTHING'}} />
                <h5 className='search-text'> ABOUT </h5>
                <input className='search-text search-input' placeholder='SOMETHING'/>
                <h5 className='search-text'> FROM </h5>
                <DropDown key={'from'} list={search['from']} {...actions} {...{name : 'from', placeholder : 'THE INTERNET'}} />
                <div className="search-button">
                    <i className="ion-ios-search-strong"></i>
                </div>
            </div>
        );
    }
}
