import React, { PropTypes, Component } from 'react';
var prefix = '';

if (process.env.NODE_ENV === "production") {
    prefix = 'public/';
}

export default class Image extends Component {
    render() {
        const { item, settings, actions, isCurrent } = this.props;
        let player = document.getElementById('video-' + item._hash);

        if (player) {
            player.volume = 0.4;

            if (isCurrent && player.paused) {
                player.play();
            } else if (!player.paused) {
                player.pause();
            }
        }

        return (<div className='video-container'><video
                src={item.data}
                id={'video-' + item._hash}
                controls
                loop
                type='video/mp4'
                height={item.dimensions && item.dimensions.height ? item.dimensions.height : settings ? settings.height : ''}
                width='90%'
                src={item.data}>
            </video>
        </div>);
    };
}
