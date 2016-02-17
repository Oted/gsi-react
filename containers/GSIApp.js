import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import * as Actions from '../actions/Actions';

//import Header from '../components/Header';
//import MainSection from '../components/MainSection';

class GSIApp extends Component {
  render() {
    const { todos, actions } = this.props;
    console.log('here');
    return (
      <div> 
        <Header/>
      </div>
    );
  }
}

function mapState(state) {
  return {
    todos: state.todos
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(GSIApp);
