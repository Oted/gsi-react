import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
import SearchBar from '../components/SearchBar';
import ScrollStage from '../components/ScrollStage';

class GSIApp extends Component {
    render() {
        const { gsi, actions } = this.props;

        return (
            <div>
                <SearchBar search={gsi.search} actions={actions} />
                <ScrollStage items={gsi.items} actions={actions} />
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
