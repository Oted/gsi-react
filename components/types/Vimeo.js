import React, { PropTypes, Component } from 'react';

export default class Vimeo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player : null
        };
    }

    componentDidMount() {
        this.state.player = $f(document.getElementById('vimeo-' + this.props.item._hash));
    }

    render() {
        const { item, settings, actions, isCurrent } = this.props;

        if (this.state.player) {
            if (isCurrent) {
                this.state.player.api('play');
            } else {
                this.state.player.api('pause');
            }
        }

        return (<iframe
            id={'vimeo-' + item._hash}
            height={settings.height}
            width={settings.width}
            frameBorder="0"
            scrolling="no"
            autostart='0'
            autoplay='false'
            src={'http://player.vimeo.com/video/' + item.data.split('/').pop() + '?autoplay=' + 1 + '&api=1&player_id=' + 'vimeoplayer'}>
        </iframe>)
    };
}
