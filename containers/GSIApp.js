import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';

import SearchBar from '../components/SearchBar';
import ScrollStage from '../components/ScrollStage';
import BreadCrumbs from '../components/BreadCrumbs';
import Suggestions from '../components/Suggestions';
import Settings from '../components/SettingsModal';
import InfoBox from '../components/InfoBox';
import SingleView from '../components/SingleView';
import SubscribeView from '../components/SubscribeView';
import Lists from '../components/Lists';

class GSIApp extends Component {
    constructor(props) {
        super(props);
        var that = this;
        props.actions.init();

        //if this is production the notification for push stuff needs to be enabled
        if (process.env.NODE_ENV === "production") {
            (OneSignal || []).push(["isPushNotificationsEnabled", function(enabled) {
                that.showSubscription = !enabled && OneSignal.isPushNotificationsSupported();
            }]);
        } else {
            setTimeout(function() {
                that.showSubscription = true;
            }, 100);
        }
    }

    render() {
        const { gsi, actions } = this.props;

        return (
            <div className="container row">
                <SearchBar
                   isMobile={gsi.is_mobile}
                   fragments={gsi.fragments}
                   related_fragments={gsi.related_fragments}
                   side_bar={gsi.side_bar}
                   fetch_count={gsi.fetch_count}
                   tooltips={gsi.tooltips}
                   search={gsi.search}
                   actions={actions}
                />
                {this.showSubscription === true ? <SubscribeView fetch_count={gsi.fetch_count} actions={actions}/> : null }
                {gsi.single_view ?
                    <div className='content-container'>
                        {gsi.queries.length ? <BreadCrumbs lists={gsi.lists} actions={actions} queries={gsi.queries}/> : null}
                        <div className='twelve columns'>
                            <SingleView
                                item={gsi.single_view}
                                actions={actions}/>
                        </div>
                    </div>
                :
                    <div className='content-container'>
                        {gsi.suggest_view &&
                            !document.getElementById('item_hash') &&
                            !document.getElementById('list_hash') ?
                            <Suggestions
                                isMobile={gsi.is_mobile}
                                suggestions={gsi.suggestions}
                                actions={actions}/> : null}

                        {gsi.settings_view ?
                            <Settings
                                isMobile={gsi.is_mobile}
                                list={gsi.search['in']}
                                autoplay={gsi.autoplay}
                                actions={actions}/> : null}

                        <div className={gsi.side_bar ? 'side-bar' : 'far-left side-bar'}>
                            <InfoBox
                                isLoading={gsi.search.isLoading}
                                actions={actions}
                                showSubscription={this.showSubscription === true}
                                queries={gsi.queries}/>

                            <Lists
                                actions={actions}
                                fragments={gsi.fragments}
                                suggestions={gsi.suggestions}
                                isMobile={gsi.is_mobile}
                                sideBar={gsi.side_bar}
                            />

                        </div>
                        <div className={
                            gsi.side_bar ? 'eight columns scroll-stage offset-by-three' : 'twelve columns scroll-stage'}>
                            { gsi.queries.length ? <BreadCrumbs
                                lists={gsi.lists}
                                actions={actions}
                                queries={gsi.queries}
                            /> : null}
                            { gsi.queries.length ? <ScrollStage
                                side_bar={gsi.side_bar}
                                isMobile={gsi.is_mobile}
                                autoplay={gsi.autoplay}
                                isLoading={gsi.search.isLoading}
                                lists={gsi.lists} actions={actions}
                                query={gsi.queries[gsi.queries.length - 1]} /> : null}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapState(state) {
    return {
        gsi : state.gsi
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}


export default connect(mapState, mapDispatch)(GSIApp);
