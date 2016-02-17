import React, { Component } from 'react';
import { Provider } from 'react-redux';
import GSIApp from './GSIApp';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <GSIApp />
            </Provider>
        );
    }
}
