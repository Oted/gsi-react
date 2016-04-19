import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';
import DropDown from '../components/DropDown'

export default class BreadCrumbs extends Component {
    onClick(e) {
        this.props.actions.unviewItem();
        this.props.actions.shineLogo();
        this.props.actions.setActiveQuery(e);
    }

    render() {
        var that = this;

        const { queries, actions } = this.props;

        return (
            <div>
                <ul className="breadcrumb">
                    {queries.filter(q => {return q.results > 0}).map(q => {
                        return (<Motion defaultStyle={{x: 0}} style={{x: spring(1)}}>
                            {value =>
                                <li style={{opacity : value.x}} key={'bread-' + q._hash} onClick={this.onClick.bind(that, q)}>
                                    <span>
                                        {(q.title || 'everything') + ' (' + q.results + ')'}
                                    </span>
                                </li>
                            }
                        </Motion>);
                    })}
                </ul>
            </div>
        );
    }
}
