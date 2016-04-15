import React, { PropTypes, Component } from 'react';
var prefix = '';

if (process.env.NODE_ENV === "production") {
    prefix = 'public/';
}

export default class InfoBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spun: 0
        };
    }

    render() {
        const { queries, actions } = this.props;

        if (!this.props.isLoading) {
            this.state.spun = 0;
            this.maybeShine();
        } else {
            this.maybeSpin();
        }

        return (
            <div className='info-box'>
                <img id='logo-play' className='logo-top' src={'./' + prefix + 'common/logo_eye.png'}></img>
                <img id="logo-bright-top" className='logo-top' src={'./' + prefix + 'common/logo_around_bright.png'}></img>
                <img id="logo-text-top" className='logo-top' src={'./' + prefix + 'common/logo_text.png'}></img>
                { queries.length ? <h4> { queries[queries.length - 1].results } things to view </h4> : null }
            </div>
        );
    }

    maybeSpin() {
        this.state.spun++;
        var that = this;
        let deg = 360;
        var e = document.getElementById('logo-text-top');

        if (!e || !this.props.isLoading) {
            return;
        }

        e.rotation = e.rotation ? e.rotation + deg : deg;
        e.style.webkitTransform = 'rotate(' + e.rotation + 'deg)';
        e.style.transform = 'rotate(' + e.rotation + 'deg)';

        setTimeout(function(){
            if (that.props.isLoading && that.state.spun < 10) {
                that.maybeSpin();
            }
        }, 1500);
    }

    maybeShine() {
        var e = document.getElementById('logo-bright-top');

        if (!e) {
            return;
        }

        e.style.opacity = 1;

        setTimeout(function(){
            e.style.opacity = 0;
        }, 750);
    }
}
