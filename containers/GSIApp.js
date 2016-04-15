import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';

import SearchBar from '../components/SearchBar';
import ScrollStage from '../components/ScrollStage';
import BreadCrumbs from '../components/BreadCrumbs';
import Suggestions from '../components/Suggestions';
import InfoBox from '../components/InfoBox';
import SingleView from '../components/SingleView';
import Lists from '../components/Lists';

class GSIApp extends Component {
    constructor(props) {
        super(props);
        props.actions.init();
    }

    render() {
        const { gsi, actions } = this.props;
        return (
            <div className="container row">
                <SearchBar side_bar={gsi.side_bar} search={gsi.search} actions={actions}/>
                { gsi.single_view ?
                    <div className='content-container'>
                        { gsi.queries.length ? <BreadCrumbs lists={gsi.lists} actions={actions} queries={gsi.queries} /> : null}
                        <div className='twelve columns'>
                            <SingleView item={gsi.single_view} actions={actions}/>
                        </div>
                    </div>
                :
                    <div className='content-container'>
                        {gsi.suggest_view &&
                            !document.getElementById('item_hash') &&
                            !document.getElementById('list_hash') ? <Suggestions suggestions={gsi.suggestions} actions={actions}/> : null}
                        <div className={
                            gsi.side_bar ?
                                gsi.isMobile ? 'six columns side-bar'
                                : 'three columns side-bar'
                            : 'far-left side-bar'
                        }>
                            <InfoBox isLoading={gsi.search.isLoading} actions={actions} queries={gsi.queries}/>
                            <Lists actions={actions} fragments={gsi.fragments} suggestions={gsi.suggestions}/>
                        </div>
                        <div className={
                            gsi.side_bar ?
                                gsi.isMobile ? 'five columns scroll-stage'
                                : 'eight columns scroll-stage'
                            : 'twelve columns scroll-stage'}>
                            { gsi.queries.length ? <BreadCrumbs lists={gsi.lists} actions={actions} queries={gsi.queries} /> : null}
                            { gsi.queries.length ? <ScrollStage
                                side_bar={gsi.side_bar}
                                isMobile={gsi.is_mobile}
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
