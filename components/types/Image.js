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
        window.open('http://37.139.19.174/thing/' + this.props.item._hash);
    }
}
