import React, { PropTypes, Component } from 'react';
import Infinite from 'react-infinite';
import { Motion, spring } from 'react-motion';
import { getPosition } from '../utils/Utils';

import Image from '../components/types/Image';
import Youtube from '../components/types/Youtube';
import Soundcloud from '../components/types/Soundcloud';
import Twitch from '../components/types/Twitch';
import Video from '../components/types/Video';
import Vimeo from '../components/types/Vimeo';

import ItemTitle from '../components/ItemTitle';
import ItemFooter from '../components/ItemFooter';

export default class ScrollStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            additionalItemHeigth : props.isMobile ? 125 : 100,
            heights:[],
            typeSettings : {
                'img' : {
                    'height' : props.isMobile ? 400 : 500
                },
                'gif' : {
                    'height' : 500
                },
                // https://developers.google.com/youtube/player_parameters
                'youtube' : {
                    'height': 390,
                    'options' : {
                        height: '390',
                        playerVars: {
                            autoplay: 0,
                            iv_load_policy : 3
                        }
                    }
                },
                'twitch' : {
                    'height' : 390,
                    'width' : 640
                },
                'vimeo' : {
                    'height' : 390,
                    'width' : 640
                },
                'video' : {
                    'height' : props.isMobile ? 390 : props.side_bar ? 390 : 500
                },
                'soundcloud' : {
                    'height' : 150
                }
            }
        }
    }

    buildElements(list) {
        var that = this;

        return list.map(function(item, index) {
            const isCurrent = index === that.props.lists[that.props.query._hash].currentIndex;
            return (<div key={that.props.query._hash + '-' + item._hash}
                         className={isCurrent ? 'item current' : 'item'}
                         style={{height: that.getHeight.call(that, item) + that.state.additionalItemHeigth}}>
                <ItemTitle actions={that.props.actions} item={item} />
                {that.getTargetComponent(item, isCurrent, that.props.isMobile)}
                <ItemFooter isMobile={that.props.isMobile} actions={that.props.actions} item={item} />
            </div>)
        });
    }

    getHeights(list) {
        var that = this;

        this.state.heights = list.map(item => {
            return that.getHeight(item) + that.state.additionalItemHeigth + 22;
        });
        return this.state.heights;
    }

    getHeight(item) {
        return (item.dimensions && item.dimensions.height ? item.dimensions.height : this.state.typeSettings[item.type].height);
    }

    handleScroll(node) {
        let position = window.pageYOffset || document.documentElement.scrollTop;

        let h = -window.innerHeight / 4;
        let target = 0;

        for (var i = 0; i < this.state.heights.length; i++) {
            h += this.state.heights[i];

            if (h >= position) {
                target = i;
                break;
            }
        }

        if (this.props.lists[this.props.query._hash].currentIndex !== target) {
            this.props.actions.setCurrentIndex(target, this.props.query._hash);
        }
    }

    render() {
        if (!this.props.lists[this.props.query._hash]) {
            return (<div></div>);
        }

        if (!this.props.lists[this.props.query._hash].items.length) {
            return (<div>
                <h5> Sorry, no items matches this search </h5>
            </div>);
        }

        const list = this.props.lists[this.props.query._hash];
        const { actions } = this.props;

        return (<Motion defaultStyle={{x: 0}} style={{x: spring(1)}}>
            {value =>
                <div style={{opacity : value.x}} id='scroll-container'>
                    <Infinite
                        handleScroll={::this.handleScroll}
                        useWindowAsScrollContainer
                        elementHeight={this.getHeights(list.items)}
                        infiniteLoadBeginEdgeOffset={2000}
                        onInfiniteLoad={::this.handleInfiniteLoad}
                        preloadBatchSize={Infinite.containerHeightScaleFactor(3)}>
                            {this.buildElements(list.items)}
                    </Infinite>
                    <div
                        style={{'opacity' : list.currentIndex >= 1 ? (list.currentIndex - 2) / 4 : 0}}
                        className='scroll-back'
                        onClick={::this.scrollToTop}>
                        <i className="ion-chevron-up"></i>
                    </div>
                </div>
            }
        </Motion>);
    }

    handleInfiniteLoad() {
        if (!this.props.isLoading) {
            this.props.actions.fetch();
        }
    }

    scrollToTop() {
        this.props.actions.scrollToIndex(0, this.props.query._hash);
    }

    getTargetComponent(item, isCurrent, isMobile) {
        switch (item.type) {
           case "img" :
                return <Image isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "gif" :
                return <Image isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "youtube" :
                return <Youtube isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "soundcloud" :
                return <Soundcloud isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "twitch" :
                return <Twitch isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "vimeo" :
                return <Vimeo isCurrent={!isMobile && isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "video" :
                return <Video isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            default :
                return <div></div>
        }
    }
}
