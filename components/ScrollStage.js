import React, { PropTypes, Component } from 'react';
import Infinite from 'react-infinite';
import { getPosition } from '../utils/Utils';

import Image from '../components/types/Image';
import Youtube from '../components/types/Youtube';
import Soundcloud from '../components/types/Soundcloud';
import Twitch from '../components/types/Twitch';
import Video from '../components/types/Video';
import Vimeo from '../components/types/Vimeo';

import ItemTitle from '../components/ItemTitle';

export default class ScrollStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            additionalItemHeigth : 100,
            heights:[],
            typeSettings : {
                'img' : {
                    'height' : 400
                },
                'gif' : {
                    'height' : 300
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
                    'height' : 390
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
                <div className='item-header'>
                    <ItemTitle actions={that.props.actions} item={item} />
                </div>
                {that.getTargetComponent(item, isCurrent)}
                <div className='item-footer'></div>
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
        return (item.height || this.state.typeSettings[item.type].height);
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

        const renderedItems = this.buildElements(list.items);

        return (<div id='scroll-container'>
            <Infinite
                handleScroll={::this.handleScroll}
                useWindowAsScrollContainer
                elementHeight={this.getHeights(list.items)}
                infiniteLoadBeginEdgeOffset={2000}
                onInfiniteLoad={::this.handleInfiniteLoad}
                preloadBatchSize={Infinite.containerHeightScaleFactor(3)}>
                    {renderedItems}
            </Infinite>
            <div
                style={{'opacity' : list.currentIndex >= 2 ? (list.currentIndex - 2) / 4 : 0}}
                className='scroll-back'
                onClick={::this.scrollToTop}>
                <i className="ion-chevron-up"></i>
            </div>
        </div>);
    }

    handleInfiniteLoad() {
        this.props.actions.getItems();
    }

    scrollToTop() {
        this.props.actions.scrollToIndex(0, this.props.query._hash);
    }

    getTargetComponent(item, isCurrent) {
        switch (item.type) {
           case "img" :
                return <Image isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "gif" :
                return <Image isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "youtube" :
                return <Youtube isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "soundcloud" :
                return <Soundcloud isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "twitch" :
                return <Twitch isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "vimeo" :
                return <Vimeo isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            case "video" :
                return <Video isCurrent={isCurrent} item={item} settings={this.state.typeSettings[item.type]}/>
            break;
            default :
                return <div></div>
        }
    }
}
