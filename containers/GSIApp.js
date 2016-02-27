import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';

import SearchBar from '../components/SearchBar';
import ScrollStage from '../components/ScrollStage';
import BreadCrumbs from '../components/BreadCrumbs';

class GSIApp extends Component {
    render() {
        const { gsi, actions } = this.props;
        return (
            <div className="container row">
                <SearchBar search={gsi.search} actions={actions} />
                <div className='right six columns'>
                    { gsi.queries.length ? <BreadCrumbs lists={gsi.lists} actions={actions} queries={gsi.queries} /> : null}
                    { gsi.queries.length ? <ScrollStage lists={gsi.lists} actions={actions} query={gsi.queries[0]} /> : null}
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
