import React, { PropTypes, Component } from 'react';

export default class ItemTitle extends Component {
    onClick(word) {
        var that = this;

        this.props.actions.setSearchText(word);
        setTimeout(function() {
            that.props.actions.search();
        }, 100);
    }

    render() {
        const { item, actions } = this.props;
        const words = item.title.split(' ');

        return (this.addTitleFragments(item, words, item.fragments || []));
    }

    addTitleFragments(item, words, fragments) {
        var that = this;

        return (<h5> { words.map(word => {
            const strip = word.toLowerCase().replace(/[^a-zA-Z\d\s:]/g, '').trim();
            if (fragments.indexOf(strip) > -1) {
                return (<span
                        className='title-fragment'
                        onClick={::that.onClick.bind(that, strip)}> {word} </span>)
            }

            return (<span> {word} </span>);
        })} </h5>)
    }
}
