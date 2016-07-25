import React, { PropTypes, Component } from 'react';
var prefix = window.location.origin;

export default class SubscribeView extends Component {
    constructor(props) {
        super(props);

        this.timer = setTimeout(() => {
            this.setState({
                'notify' : true
            })
        }, 30000);

        this.state = {
            'notify' : false
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    notifyMe() {
        OneSignal.push(["registerForPushNotifications", {
            modalPrompt: false
        }]);

        setTimeout(() => {
            this.setState({notify : false});
        }, 100);
    }

    modalClick(e) {
        e.stopPropagation();
    }

    render() {
        if (!this.state.notify) {
            return (<div className='modal subscribe-view far-left transparent'></div>);
        }

        const { queries, actions } = this.props;

        return (<div onClick={this.setState.bind(this, {notify : false})} className='overlay'>
            <div onClick={this.modalClick.bind(this)} className='modal subscribe-view'>
                <h3 style={{'border-bottom' : '1px solid',
                    'margin-left' : '10%',
                    'margin-right' : '10%'}}> TIRED OF BEING BORED? </h3>
                <div style={{'margin' : '2rem'}}>
                    <span> Get real-time alerts when we find something we think you’ll like on the internet. <br/> Click the button below ⤵ to enable alerts, but you’re free to continue browsing too.
                    </span>
                </div>
                <span className='notify-button' onClick={this.notifyMe.bind(this)}> Enable alerts </span>
            </div>
        </div>);
    }
}
