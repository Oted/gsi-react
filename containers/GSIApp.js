import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';

import SearchBar from '../components/SearchBar';
import ScrollStage from '../components/ScrollStage';
import BreadCrumbs from '../components/BreadCrumbs';
import InfoBox from '../components/InfoBox';
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
                <SearchBar search={gsi.search} actions={actions} />
                <div className='content-container'>
                    <div className='three columns'>
                        <InfoBox isLoading={gsi.search.isLoading} actions={actions} queries={gsi.queries}/>
                        <Lists actions={actions} fragments={gsi.fragments}/>
                    </div>
                    <div className='eight columns'>
                        { gsi.queries.length ? <BreadCrumbs lists={gsi.lists} actions={actions} queries={gsi.queries} /> : null}
                        { gsi.queries.length ? <ScrollStage isLoading={gsi.search.isLoading} lists={gsi.lists} actions={actions} query={gsi.queries[0]} /> : null}
                    </div>
                </div>
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
