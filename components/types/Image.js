import React, { PropTypes, Component } from 'react';

export default class Image extends Component {
    render() {
        const { item, settings, actions } = this.props;

        if (!settings) {
            return (<img src={item.data}></img>);
        }

        return (<img
                src={item.data}
                onClick={this.inspect.bind(this)}
                style={{height: item.dimensions && item.dimensions.height ? item.dimensions.height : settings.height, cursor: 'pointer'}}>
        </img>);
    };

    inspect() {
        if (this.props.isMobile) {
            return;
        }

        window.open(this.props.item.source);
    }
}
