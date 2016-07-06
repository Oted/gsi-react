import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

export default class DropDown extends Component {
    render() {
        const { list } = this.props;

        return (
            <div className="dropdown">
                <div className="dropbtn search-text">
                    {this.props.placeholder}
                    <i style={{'padding-left' : '3px'}} className='ion-arrow-down-b arrow'></i>
                </div>
                <div className="dropdown-content"> {
                } </div>
            </div>
        );
    }
}
