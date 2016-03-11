import React, { PropTypes, Component } from 'react';
import { PlayButton, Icons, Cover } from 'react-soundplayer/components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import SoundCloudAudio from 'react-soundplayer/node_modules/soundcloud-audio';

export default class Soundcloud extends Component {
    render() {
        const { item, settings, actions } = this.props;

        console.log(item);
        return (<div>
            <SoundPlayerContainer resolveUrl={item.data} clientId='08f79801a998c381762ec5b15e4914d5'>
                <CustomPlayer isCurrent={this.props.isCurrent} />
            </SoundPlayerContainer>
        </div>);
    }
};

class CustomPlayer extends React.Component {
    render() {
        let { track, currentTime, duration, soundCloudAudio, isCurrent } = this.props;

        if (!track) {
            return <div>Loading...</div>;
        }

        if (isCurrent) {
            soundCloudAudio.play();
        } else {
            soundCloudAudio.pause();
        }

        return (
            <div>
                <div className='soundcloud-container'>
                    <PlayButton className='soundcloud-play' {...this.props} />
                    <Progress className='soundcloud-progress' value={currentTime / duration * 100 || 0} {...this.props} />
                </div>
                {currentTime ? <p> {Math.floor(currentTime / 60)} : {Math.floor(currentTime % 60)} / {Math.floor(duration / 60)} : {Math.floor(duration % 60)} </p> : null}
            </div>
        )
    }
};

class Progress extends Component {
    handleSeekTrack(e) {
        let { onSeekTrack, soundCloudAudio } = this.props;
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;


        if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
            soundCloudAudio.audio.currentTime = (xPos * soundCloudAudio.audio.duration);
        }

        onSeekTrack && onSeekTrack.call(this, xPos, e);
    }

    render() {
        let { value, track } = this.props;

        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        let style = {width: `${value}%`};

        return (
            <div className='soundcloud-progress sb-soundplayer-progress-container' onClick={this.handleSeekTrack.bind(this)}>
                <img className='soundcloud-waveform' src={track.waveform_url}></img>
                <div className='sb-soundplayer-progress-inner' style={style}/>
            </div>
        );
    }
}
