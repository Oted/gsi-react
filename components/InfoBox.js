import React, { PropTypes, Component } from 'react';
var prefix = window.location.origin;

export default class InfoBox extends Component {
    constructor(props) {
        super(props);
    }

    notify() {
        return OneSignal.push(["registerForPushNotifications", {modalPrompt: false}]);
    }

    render() {
        const { queries, actions, showSubscription } = this.props;

        return (<div className='info-box'>
                <img id='logo-play' className='logo-top' src={prefix + '/common/logo_eye.png'}></img>
                <img id="logo-bright-top" className='logo-top' src={prefix  + '/common/logo_around_bright.png'}></img>
                <img id="logo-text-top" className='logo-top' src={prefix + '/common/logo_text.png'}></img>
                { queries.length ? <h4> Viewing { queries[queries.length - 1].results } things </h4> : null }
                { showSubscription ? <span className='notify-button' onClick={this.notify}> Enable notifications </span> : null }
            </div>
        );
    }
}
