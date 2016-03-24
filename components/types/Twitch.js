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
            height={settings.height}
            width={settings.width}
            frameBorder="0"
            scrolling="no"
            autostart='0'
            autoplay='false'
            src={item.data}>
        </iframe>)
    };
}
