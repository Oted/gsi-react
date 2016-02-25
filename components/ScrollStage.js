import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown';
import Infinite from 'react-infinite';

export default class ScrollStage extends Component {
    static defaultProps = {
        items: {}
    };

    buildElements() {
        console.log(this);
        return this.props.items['test'].map(item => {
            return (<div>
                <h3> item.title </h3>
            </div>)
        });
    }

    handleInfiniteLoad() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
    }

    render() {
        const itemHeight = 400;
        const { items, actions } = this.props;

        return (<div id='scroll-container'>
            <Infinite
               // handleScroll={::this._handleItemInFocus}
                useWindowAsScrollContainer
                elementHeight={itemHeight}
                infiniteLoadBeginEdgeOffset={2000}
                onInfiniteLoad={::this.handleInfiniteLoad}>
                    {::this.buildElements()}
            </Infinite>
        </div>);
    }
}
