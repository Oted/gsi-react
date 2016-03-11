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
                {queries.filter(q => {return q.results > 0}).map(q => {
                    return (<li
                            key={'bread-' + q._hash}
                            onClick={::actions.setActiveQuery.bind(this, q)}>
                        <span>
                            {(q.search || 'everything') + ' (' + q.results + ')'}
                        </span>
                    </li>);
                })}
            </ul>
        );
    }
}
