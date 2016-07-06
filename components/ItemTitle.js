import React, { PropTypes, Component } from 'react';
import * as date from '../utils/Date.js';

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

        return (<div className='item-header'>
            <span className='title-added-at'> {date.format(new Date(item.created))} </span>
            {this.addTitleFragments(item, words, item.fragments || [])}
        </div>);
    }

    addTitleFragments(item, words, fragments) {
        var that = this;
        var glowed = false;

        return (<h5> { words.map(word => {
                const strip = word.toLowerCase().replace(/[^a-zA-Z\d\s:]/g, '').trim();

                if (fragments.indexOf(strip) > -1) {
                    const shouldGlow = Math.random() < 0.073;

                    var el = (<span
                        className={!glowed && shouldGlow ? 'title-fragment text-glow' : 'title-fragment'}
                        onClick={that.onClick.bind(that, strip)}> {word} </span>)

                    if (shouldGlow) {
                        glowed = true;
                    }

                    return el;
                }

                return (<span> {word} </span>);
            })}
        </h5>)
    }
}
