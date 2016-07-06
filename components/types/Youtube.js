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
                id={'youtube-' + item._hash}
                videoId={item.data}
                opts={settings ? settings.options : {
                        'height' : '640',
                        'width' : '1280',
                        playerVars: {
                            autoplay: 1,
                            iv_load_policy : 3,
                            fs: 0
                        }
                    }
                }
                onReady={this.onReady.bind(this)}
            />
        );
    };

    onReady(event) {
        event.target.pauseVideo();
        this.state.player = event.target;
    }
};
