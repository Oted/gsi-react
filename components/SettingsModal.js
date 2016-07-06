import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

export default class SettingsModal extends Component {
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
        var that = this;
        const { actions, isMobile, autoplay, list } = this.props;

        return (<div
                onClick={that.props.actions.toggleSettingsModal.bind(that)}
                className='overlay'>
            <Motion defaultStyle={{scale : 0}} style={{scale : spring(1)}}>
                {value =>
                    <div onClick={that.modalClick.bind(that)}
                    style={{transform: 'scale(' + value.scale + ')'}} className='modal'>
                        <h3> Settings </h3> <div
                            onClick={that.props.actions.toggleAutoplay.bind(that)}
                            className='toggle-button'>
                            <h4> toggle autoplay </h4>
                            {autoplay ?
                                <i className='ion-checkmark-round green'></i> :
                                <i className='ion-close-round red'></i>
                            }
                        </div>
                        <br/>
                        {list.map(item => {
                            return (<div className='toggle-button' onClick={actions.toggleSearchType.bind(that, 'in', item.type)}>
                                <span> show {item.type.toLowerCase()} </span>
                                <br/>
                                {item.active ?
                                    <i className='ion-checkmark-round green'></i> :
                                    <i className='ion-close-round red'></i>}
                            </div>)})
                        }
                    </div>
                }
            </Motion>
        </div>);
    }
}
