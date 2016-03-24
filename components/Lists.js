import React, { PropTypes, Component } from 'react';

export default class Lists extends Component {
    onClick(word) {
        var that = this;

        this.props.actions.setSearchText(word);
        setTimeout(function() {
            that.props.actions.search();
        }, 100);
    }

    render() {
        const { fragments, actions } = this.props;

        return (<div>
            {fragments.trending ? this.generateList('trending') : null}
            {fragments.popular ? this.generateList('popular') : null}
            {fragments.fresh ? this.generateList('fresh') : null}
        </div>);
    }

    generateList(list) {
        let that = this;

        return (<div className='list'>
            <span className='list-title'> {list.toUpperCase()} </span>
            <ul>
                {this.props.fragments[list].map(fragment => {
                    return (<li
                            onClick={this.onClick.bind(that, fragment.string)}
                            key={list + '-' + fragment.string}
                            className='list-fragment'> {fragment.string}
                    </li>);
                })}
            </ul>
        </div>);
    }
}
