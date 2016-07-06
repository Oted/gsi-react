import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

export default class Suggestions extends Component {
    constructor(props) {
        super(props);
    }

    suggestClick(suggestion) {
        var that = this;

        this.props.actions.getRelatedFragments(suggestion.name || suggestion.search);

        suggestion.hash ?
            this.props.actions.getQueryWithHash(suggestion.hash) :
            this.props.actions.search(suggestion.search);

        return setTimeout(function() {
            that.props.actions.toggleSuggestView();
        }, 100);
    }

    modalClick(e) {
        e.stopPropagation();
    }

    render() {
        var that = this;
        const { actions, suggestions, isMobile } = this.props;

        return (<div
                onClick={that.props.actions.toggleSuggestView.bind(that)}
                className='overlay'>
            <Motion defaultStyle={{scale : 0}} style={{scale : spring(1)}}>
                {value =>
                    <div
                    onClick={that.modalClick.bind(that)}
                    style={{transform: 'scale(' + value.scale + ')'}} className='modal'>
                        <h3> What are you looking for today? </h3>
                        <div className='suggestions'>
                            <div
                            onClick={that.props.actions.toggleSuggestView.bind(that)}
                            className='suggestion'>
                                <div className='blue'>
                                    <i className='ion-play'></i>
                                </div>
                                <h4> everything </h4>
                            </div>
                            {suggestions.map(suggestion => {
                                return (<div onClick={that.suggestClick.bind(that, suggestion)}
                                        className='suggestion'>
                                    <div className='green'>
                                        <i className={suggestion.icon}></i>
                                    </div>
                                    <h4> {suggestion.name} </h4>
                                </div>)
                            })}
                        </div>
                    </div>
                }
            </Motion>
        </div>);
    }
}
