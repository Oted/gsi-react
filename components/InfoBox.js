import React, { PropTypes, Component } from 'react';
var prefix = '';

if (process.env.NODE_ENV === "production") {
    prefix = 'public/';
}

export default class InfoBox extends Component {
    render() {
        const { queries, actions } = this.props;

        return (
            <div className='info-box'>
                <img id='logo-play' className='logo-top' src={'./' + prefix + 'common/logo_eye.png'}></img>
                <img id="logo-bright-top" className='logo-top' src={'./' + prefix + 'common/logo_around_bright.png'}></img>
                <img id="logo-text-top" className='logo-top' src={'./' + prefix + 'common/logo_text.png'}></img>
                { queries.length ? <h4> { queries[queries.length - 1].results } things to view </h4> : null }
            </div>
        );
    }
}
