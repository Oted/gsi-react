import React, { PropTypes, Component } from 'react';

export default class Twitch extends Component {
    render() {
        const { item, settings, actions } = this.props;

        window.onPlayerEvent = function (data) {
            data.forEach(function(event) {
                if (event.event == "videoPlaying") {
                    var player = document.getElementsById('twitch-' + item._hash);
                    if (player.isPaused()) {
                        player.pauseVideo();
                    }
                }
            })
        }

        return (<iframe
            id={'twith-' + item._hash}
            height={settings ? settings.height : '720'}
            width={settings ? settings.width : '1280'}
            frameBorder="0"
            scrolling="no"
            autostart='0'
            src={'https://player.twitch.tv/?autoplay=false&channel=' + item.data.split('/').slice(-2,-1).join('')}>
        </iframe>);
    };
}
