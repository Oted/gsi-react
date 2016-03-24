import React, { PropTypes, Component } from 'react';
import ReactYoutube from 'react-youtube';

export default class Youtube extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: null
        }
    }

    render() {
        const { item, settings, actions, isCurrent } = this.props;

        if (this.state.player) {
            if (isCurrent) {
                this.state.player.playVideo();
            } else {
                this.state.player.pauseVideo();
            }
        }

        return (
            <ReactYoutube
                style={{height: item.height || settings.options.height}}
                id={'youtube-' + item._hash}
                videoId={item.data}
                opts={settings.options}
                onReady={this.onReady.bind(this)}
            />
        );
    };

    onReady(event) {
        event.target.pauseVideo();
        this.state.player = event.target;
    }
};
