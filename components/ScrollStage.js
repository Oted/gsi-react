import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown';
import Infinite from 'react-infinite';

export default class ScrollStage extends Component {
    buildElements() {
        if (!this.props.lists[this.props.query._id]) {
            //no items to show
            return (<div></div>);
        }

        console.log('rendering items', this.props.lists[this.props.query._id]);

        return this.props.lists[this.props.query._id].items.map(item => {
            return (<div key={item} className='scroll-item'>
                <h3> {item.title} </h3>
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
