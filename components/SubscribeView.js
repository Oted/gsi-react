import React, { PropTypes, Component } from 'react';
var prefix = window.location.origin;

export default class SubscribeView extends Component {
    constructor(props) {
        super(props);

        this.timer = setTimeout(() => {
            this.setState({
                'notify' : true
            })
        }, 35000);

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
            return (<div className='modal subscribe-view far-left transparent'>
                <h4> DON'T MISS OUT! </h4>
                <div style={{'margin' : '2rem'}}>
                    <span> Tell me about the best internet trends, as they happen. </span>
                </div>
                <span className='notify-button' onClick={this.notifyMe.bind(this)}> Enable notifications </span>
            </div>);
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
                <span className='notify-button' onClick={this.notifyMe.bind(this)}> Enable notifications </span>
            </div>
        </div>);
    }
}
