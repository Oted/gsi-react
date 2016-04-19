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
            return 'ALL';
        }

        return activeTypes.length === 1 ? activeTypes[0].type : activeTypes.length + ' TYPES'
    }

    toggleSideBar() {
        if (this.props.isMobile) {
            this.props.actions.scrollToPosition(0);
        }

        this.props.actions.toggleSideBar();
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
        const { search, actions, side_bar, isMobile } = this.props;

        return (
            <div className='top-bar'>
                <div className={side_bar ? 'toggle-side green' : 'toggle-side'} onClick={this.toggleSideBar.bind(this)}>
                    <i className='ion-navicon-round'></i>
                </div>
                <div className='search-container'>
                    {isMobile ? null : <h5 className='search-text'> search </h5>}
                    <DropDown key={'in'} list={search['in']} {...actions} {...{name : 'in', placeholder : this.getInPlaceholder()}} />
                    {isMobile ? null : <h5 className='search-text'> about </h5>}
                    <input
                        className='search-text search-input'
                        placeholder='SOMETHING'
                        value={search.for || ''}
                        autoFocus='true'
                        onChange={::this.onChange}
                        onKeyDown={::this.search}/>
                    <div className="search-button">
                        <div style={{'top' : '5px', 'position' : 'relative'}}>
                            <i className="ion-ios-search-strong"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
