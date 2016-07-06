import React, { PropTypes, Component } from 'react';

export default class Image extends Component {
    render() {
        const { item, settings, actions } = this.props;
        const height = item.dimensions && item.dimensions.height ? item.dimensions.height : settings.height;

        if (!settings) {
            return (<img src={item.data}></img>);
        }

        //if this is from ifunny then hide their fagget box lol
        if (item.source_type === 'ifunny' || item.source.indexOf('http://ifunny.co') > -1) {
            return (<div style={{height : height - 20, overflow:'hidden'}}>
                <img
                    src={item.data}
                    onClick={this.inspect.bind(this)}
                    style={{height: height, cursor: 'pointer', maxWidth : '100%', width: 'auto'}}>
                </img>
             </div>);
        }

        return (<img
            src={item.data}
            onClick={this.inspect.bind(this)}
            style={{height: height, cursor: 'pointer', width: 'auto'}}>
        </img>);
    };

    inspect() {
        if (this.props.isMobile) {
            return;
        }

        window.open(this.props.item.source);
    }
}
