import React, { PropTypes, Component } from 'react';

export default class Image extends Component {
    render() {
        const { item, settings, actions } = this.props;

        return (<img src={item.data} style={{height: item.dimensions && item.dimensions.height ? item.dimensions.height : settings.height}} ></img>);
    };
}
