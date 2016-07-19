import React, { PropTypes, Component } from 'react';
var prefix = window.location.origin;

export default class SubscribeView extends Component {
    constructor(props) {
        super(props);

        this.timer = setTimeout(() => {
            this.setState({
                'notify' : true
            })
        }, 40000);

        this.state = {
            'notify' : false
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    notifyMe() {
        return OneSignal.push(["registerForPushNotifications", {
            modalPrompt: false
        }]);
    }

    modalClick(e) {
        e.stopPropagation();

        setTimeout(() => {
            this.setState({notify : false});
        }, 100);
    }

    render() {
        if (!this.state.notify) {
            return (<div className='subscribe-modal'></div>);
        }

        const { queries, actions } = this.props;

        return (<div onClick={this.setState.bind(this, {notify : false})} className='overlay'>
            <div onClick={this.modalClick.bind(this)} className='modal subscribe-view'>
                <h4 style={{'border-bottom' : '1px solid',
                    'margin-left' : '10%',
                    'margin-right' : '10%'}}> DON'T MISS OUT! </h4>
                <div style={{'margin' : '2rem'}}>
                    <span> Get notified about the craziest internet trends, as they happen. </span>
                </div>
                <span className='notify-button' onClick={this.notifyMe}> Enable notifications </span>
            </div>
        </div>);
    }
}