import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown'

export default class SearchBar extends Component {
    search(e) {
        if (e.type === 'click') {
            this.props.actions.search();
        }

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
                <div onClick={actions.toggleSettingsModal.bind(this)} className="settings-button">
                    <i className="ion-gear-a"></i>
                </div>
                <div className='search-container'>
                    <DropDown key={'in'} list={search['in']} {...actions} {...{name : 'in', placeholder : this.getInPlaceholder()}} />
                    <input
                        className='search-text search-input'
                        placeholder='SEARCH'
                        value={search.for || ''}
                        autoFocus='true'
                        onChange={::this.onChange}
                        onKeyDown={::this.search}
                    />
                    <div onClick={this.search.bind(this)} className="search-button">
                        <i className="ion-ios-search-strong"></i>
                    </div>
                </div>
            </div>
        );
    }
}
