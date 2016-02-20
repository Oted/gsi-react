import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown'

export default class SearchBar extends Component {
    render() {
        // console.log(this.props);
        const { search } = this.props;

        return (
            <div className='search-bar'>
                <h5 className='search-text'> Search for </h5>
                <DropDown key={'in'}  />
            </div>
        );
    }
}
