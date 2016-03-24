import React, { PropTypes, Component } from 'react';

export default class Image extends Component {
    render() {
        const { item, settings, actions, isCurrent } = this.props;

        if (document.getElementById('video-' + item._hash)) {
            if (isCurrent) {
                document.getElementById('video-' + item._hash).play();
            } else {
                document.getElementById('video-' + item._hash).pause();
            }
        }

        return (<video
            src={item.data}
            id={'video-' + item._hash}
            controls
            loop
            type='video/mp4'
            height={item.dimensions && item.dimensions.height ? item.dimensions.height : settings.height}
            width={settings.width}
            src={item.data}>
        </video>);
    };
}
