import React, { PropTypes, Component } from 'react';
import ToolTip from '../components/ToolTip';

export default class SearchBar extends Component {
    search = (e) => {
        if (e.type === 'click') {
            this.props.actions.search();
        }

        if (e.which === 13) {
            this.props.actions.search();
        }

        this.props.actions.seenTooltip('search');
    }

    highlightClick = (fragment) => {
        if (fragment) {
            this.props.actions.search(fragment);
            this.props.actions.sendGAData('HIGHLIGHT', 'CLICK', fragment);
        }
    }

    onChange = (e) => {
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

        return activeTypes.length === 1 ? activeTypes[0].type : activeTypes.length + ' PLACES';
    }

    render() {
        var that = this;
        const { search, actions, side_bar, isMobile, fetch_count, fragments, related_fragments } = this.props;
        const should_show_search_tooltip  = !isMobile && !this.props.tooltips.search && window.scrollY > 7000;
        const should_show_related_tooltip = this.props.tooltips.search && !isMobile && !this.props.tooltips.related && related_fragments && related_fragments.length;

        //if there is a related list, use that otherwise fallback on a given highligts from fragments db
        const highlights = related_fragments && related_fragments.length ?
            related_fragments.map(f => {return f.fragment}) : [];

        return (
            <div className='top-bar'>
                <div className={side_bar ? 'toggle-side green' : 'toggle-side'} onClick={this.toggleSideBar.bind(this)}>
                    <i className='ion-navicon-round'></i>
                </div>
                <div className='highlight-fragments'>
                    <ToolTip tooltip='related' actions={actions} style={{position: 'absolute', transform: 'translateX(-60%)',
                        left: should_show_related_tooltip ? '50%' : -50000,
                        opacity: should_show_related_tooltip ? 1 : 0}}>
                        Hey! <br/> We found some other things you might like 🚀
                    </ToolTip>
                    {highlights.slice(0, isMobile ? 0 : 7).map(function(fragment) {
                        return (<span className='highlight-fragment' onClick={that.highlightClick.bind(that, fragment)}> {fragment} </span>);
                    })}
                </div>
                {!isMobile ? <div className='navigation'>
                </div> : null}
                <div onClick={actions.toggleSettingsModal.bind(this)} className="settings-button">
                    <i className="ion-gear-a"></i>
                </div>
                <div className='search-container'>
                    <div style={{position:'relative', display:'inline-block'}}>
                        <input
                            className='search-text search-input'
                            placeholder='SEARCH'
                            value={search.for || ''}
                            autoFocus='true'
                            onChange={this.onChange}
                            onKeyDown={this.search}
                        />
                        <ToolTip tooltip='search' actions={actions} style={{position: 'absolute', transform: 'translateX(-60%)',
                            left: should_show_search_tooltip ? '50%' : -50000,
                            opacity: should_show_search_tooltip ? 1 : 0}}>
                            Go on, search for your favorite <br/> thing on the internet ☝
                        </ToolTip>
                    </div>
                    <div onClick={this.search} className="search-button">
                        <i className="ion-ios-search-strong"></i>
                    </div>
                </div>
            </div>
        );
    }
}
