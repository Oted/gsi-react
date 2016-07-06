import React, { Component, PropTypes } from 'react';

export default class Suggestions extends Component {
    render () {
        return (<span className="tooltip" style={this.props.style}>
            <div className="tooltip__text">
                <span className='tooltip-close' onClick={this.props.actions.seenTooltip.bind(null, this.props.tooltip)}>
                    <i className='ion-android-close'></i>
                </span>
                {this.props.children}
            </div>
        </span>);
    };
}
