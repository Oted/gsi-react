import React, { PropTypes, Component } from 'react';
import SingleItemTitle from './SingleItemTitle';
import SingleItemFooter from './SingleItemFooter';

import Image from '../components/types/Image';
import Youtube from '../components/types/Youtube';
import Soundcloud from '../components/types/Soundcloud';
import Twitch from '../components/types/Twitch';
import Video from '../components/types/Video';
import Vimeo from '../components/types/Vimeo';

export default class SingleView extends Component {
    render() {
        const { item, actions } = this.props;

        if (!item) {
            return (<div> </div>);
        }

        return (
            <div className='single-view'>
                <SingleItemTitle actions={actions} item={item} />
                {this.getTargetComponent(item, false)}
                <SingleItemFooter actions={actions} item={item} />
            </div>
        );
    }

    getTargetComponent(item, isCurrent) {
        switch (item.type) {
           case "img" :
                return <Image isCurrent={isCurrent} item={item}/>
            break;
            case "gif" :
                return <Image isCurrent={isCurrent} item={item}/>
            break;
            case "youtube" :
                return <Youtube isCurrent={isCurrent} item={item}/>
            break;
            case "soundcloud" :
                return <Soundcloud isCurrent={isCurrent} item={item}/>
            break;
            case "twitch" :
                return <Twitch isCurrent={isCurrent} item={item}/>
            break;
            case "vimeo" :
                return <Vimeo isCurrent={isCurrent} item={item}/>
            break;
            case "video" :
                return <Video isCurrent={isCurrent} item={item}/>
            break;
            default :
                return <div></div>
        }
    }
}
