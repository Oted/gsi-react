import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
import SearchBar from '../components/SearchBar'

class GSIApp extends Component {
    render() {
        const { search, actions } = this.props;

        return (
            <div>
                <SearchBar search={search} actions={actions} />
            </div>
        );
    }
}

export default connect()(GSIApp);
