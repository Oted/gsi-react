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
                <div className="dropdown-content">
                    {
                        list.map(item =>
                            <div className='drop-item'
                                key={item.type}
                                onClick={::this.props.toggleSearchType.bind(this, this.props.name, item.type)}>
                                {item.active ?
                                    <i className='ion-checkmark-round green'></i> :
                                    <i className='ion-close-round red'></i>
                                }
                                <a className='search-text'> {item.type} </a>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
