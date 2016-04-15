import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

export default class Suggestions extends Component {
    constructor(props) {
        super(props);
    }

    suggestClick(suggestion) {
        var that = this;

        suggestion.hash ?
            this.props.actions.getQueryWithHash(suggestion.hash) :
            this.props.actions.search(suggestion.search);

        return setTimeout(function() {
            that.props.actions.toggleSuggestView()
        }, 100);
    }

    modalClick(e) {
        e.stopPropagation();
    }

    render() {
        console.log('here');
        var that = this;
        const { actions, suggestions } = this.props;

        return (<div
                onClick={that.props.actions.toggleSuggestView.bind(that)}
                className='overlay'>
            <Motion defaultStyle={{x: -200, y : 0}} style={{x: spring(13), y: spring(70)}}>
                {value =>
                    <div
                    onClick={that.modalClick.bind(that)}
                    style={{top : value.x, width : value.y + '%'}} id='suggestion-modal'>
                        <h3> What are you looking for today? </h3>
                        <div className='suggestions'>
                            {suggestions.map(suggestion => {
                                return (<div onClick={that.suggestClick.bind(that, suggestion)}
                                        className='suggestion'>
                                    <div className='green'>
                                        <i className={suggestion.icon}></i>
                                    </div>
                                    <h4> {suggestion.name} </h4>
                                </div>)
                            })}
                            <div
                            onClick={that.props.actions.toggleSuggestView.bind(that)}
                            className='suggestion'>
                                <div className='blue'>
                                    <i className='ion-play'></i>
                                </div>
                                <h4> everything </h4>
                            </div>
                        </div>
                    </div>
                }
            </Motion>
        </div>);
    }
}
