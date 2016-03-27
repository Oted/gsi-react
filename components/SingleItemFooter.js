import React, { PropTypes, Component } from 'react';

export default class SingleItemFooter extends Component {
    onClick(word) {
        var that = this;

        this.props.actions.setSearchText(word);
        setTimeout(function() {
            that.props.actions.search();
        }, 100);
    }

    render() {
        const { item, actions } = this.props;

        return (<div className='footer-fragments-container'>
            {item.source_type ?
                <div>
                    <span> tags : </span>
                    <span
                        onClick={this.onClick.bind(this, item.source_type)}
                        className='footer-fragment'> {item.source_type}
                    </span>
                </div>
            : null}
            {item.author ?
                <div>
                    <span> , </span>
                    <span
                        onClick={this.onClick.bind(this, item.author)}
                        className='footer-fragment'> {item.author}
                    </span>
                </div>
            : null}
            {item.category ?
                <div>
                    <span> , </span>
                    <span
                        onClick={this.onClick.bind(this, item.category)}
                        className='footer-fragment'> {item.category}
                    </span>
                </div>
            : null}
        </div>);
    }
}
