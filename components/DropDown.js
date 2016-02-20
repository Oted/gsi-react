import React, { PropTypes, Component } from 'react';

export default class DropDown extends Component {
    render() {
        return (
            <div className="dropdown">
                <button className="dropbtn">All</button>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        );
    }
}
