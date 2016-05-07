import React, { PropTypes, Component } from 'react';

export default class ItemFooter extends Component {
    onClick(word) {
        var that = this;

        this.props.actions.setSearchText(word);
        setTimeout(function() {
            that.props.actions.search();
        }, 100);
    }

    render() {
        const { item, actions, isMobile } = this.props;

        return (<div className='item-footer'>
            <div className='footer-fragments-container'>
                {item.category && !isMobile ?
                    <div>
                        <span> category : </span>
                        <span
                            onClick={this.onClick.bind(this, item.category)}
                            className='footer-fragment'> {item.category}
                        </span>
                    </div>
                : item.author && !isMobile ?
                    <div>
                        <span> author : </span>
                        <span
                            onClick={this.onClick.bind(this, item.author)}
                            className='footer-fragment'> {item.author}
                        </span>
                    </div>
                : item.source_type && !isMobile ?
                    <div>
                        <span> from : </span>
                        <span
                            onClick={this.onClick.bind(this, item.source_type)}
                            className='footer-fragment'> {item.source_type}
                        </span>
                    </div>
                : null}
            </div>
            <div className='footer-middle'>
                <div onClick={this.inspect.bind(this)} className='inspect'>
                    <span>
                        new tab
                    </span>
                </div>
                <div onClick={this.goToSource.bind(this)} className='source tooltip-bottom'>
                    <span>
                        source
                   </span>
                </div>
            </div>

            <div className='footer-sharing'>
                <div onClick={this.copyLinkPrompt.bind(this)}
                     className='green'>
                    <i className='ion-android-share'></i>
                </div>
                <div onClick={this.facebookShare.bind(this)}
                     className='facebook-colour'>
                    <i className='ion-social-facebook'></i>
                </div>
                <div onClick={this.twitterShare.bind(this)}
                     className='twitter-colour'>
                    <i className='ion-social-twitter'></i>
                </div>
            </div>
        </div>);
    }

    goToSource() {
        window.open(this.props.item.source);
    }

    inspect() {
        window.open('http://37.139.19.174/thing/' + this.props.item._hash);
    }

    copyLinkPrompt() {
        prompt.bind(this,'Copy the link below and share with beloved friends and foes!',
                          'http://37.139.19.174/thing/' + this.props.item._hash);
    }

    twitterShare() {
        window.open('https://twitter.com/intent/tweet?text=' +
                this.props.item.title +
                '&url=http://37.139.19.174/thing/' +
                this.props.item._hash + '&via=GetSomeInternet');
    }

    facebookShare() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=http://37.139.19.174/thing/' + this.props.item._hash);
    }
}
