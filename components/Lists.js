import React, { PropTypes, Component } from 'react';

export default class Lists extends Component {
    onWordClick(word) {
        var that = this;

        this.props.actions.setSearchText(word);

        if (this.props.isMobile && this.props.sideBar) {
            this.props.actions.toggleSideBar();
        }

        setTimeout(function() {
            that.props.actions.search();
        }, 100);
    }

    suggestClick(suggestion) {
        var that = this;

        if (this.props.isMobile && this.props.sideBar) {
            this.props.actions.toggleSideBar();
        }

        suggestion.hash ?
            this.props.actions.getQueryWithHash(suggestion.hash) :
            this.props.actions.search(suggestion.search);
    }

    render() {
        const { fragments, actions, suggestions } = this.props;

        return (<div>
            {this.generateSuggestions(suggestions)}
            {fragments.trending ? this.generateList('trending') : null}
            {fragments.popular ? this.generateList('popular') : null}
            {fragments.fresh ? this.generateList('fresh') : null}
        </div>);
    }

    generateSuggestions(suggestions) {
        let that = this;

        return (<div className='list'>
            <span className='list-title'> SUGGESTIONS </span>
            <ul>
                {suggestions.map(suggestion => {
                    return (<li
                            onClick={this.suggestClick.bind(that, suggestion)}
                            key={'suggestions-' + suggestion.name}
                            className='list-fragment'> {suggestion.name}
                    </li>);
                })}
            </ul>
        </div>);
    }

    generateList(list) {
        let that = this;

        return (<div className='list'>
            <span className='list-title'> {list.toUpperCase()} </span>
            <ul>
                {this.props.fragments[list].map(fragment => {
                    return (<li
                            onClick={this.onWordClick.bind(that, fragment.string)}
                            key={list + '-' + fragment.string}
                            className='list-fragment'> {fragment.string}
                    </li>);
                })}
            </ul>
        </div>);
    }
}
