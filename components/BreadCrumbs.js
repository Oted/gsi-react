import React, { PropTypes, Component } from 'react';
import DropDown from '../components/DropDown'

export default class BreadCrumbs extends Component {
    onClick(e) {
        this.props.actions.setActiveQuery(e);
    }

    render() {
        const { queries, actions } = this.props;

        return (
            <ul className="breadcrumb">
                <li><p href="#">Home</p></li>
                <li><p href="#">Vehicles</p></li>
                <li><p href="#">Vans</p></li>
                <li><p href="#">Camper Vans</p></li>
            </ul>
        );
    }
}
