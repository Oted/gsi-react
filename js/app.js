var ReactDOM    = require('react-dom'),
    React       = require('react'),
    GSI         = require('./components/GSI.react');

/**
 *  Init for gsi app
 */
var Wrapper = React.createClass({
    render : function() {
        return <GSI/>;
    }
});
 
ReactDOM.render(<Wrapper />, document.getElementById('gsi'));
