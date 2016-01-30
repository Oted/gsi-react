/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the LolStore and passes the new data to its children.
 */
var React           = require('react'),
    Nav             = require('./Nav.react'),
    Info            = require('./Info.react'),
    Stage           = require('./Stage.react'),
    ScrollStage     = require('./ScrollStage.react'),
    FilterList      = null,
    InspectPage     = null,
    Actions         = require('../actions/Actions'),
    FilterModal     = require('./FilterModal.react'),
    //contact and feedback here ->
    AboutPage       = null,
    Store           = require('../stores/Store');

/**
 * Retrieve the current performers data from the LolStore
 */
function getState() {
    return {
        // current     : LolStore.getCurrentPerformer(),
        // experience  : LolStore.getExperience(),
        // performers  : LolStore.getPerformers(),
        // adjectives  : LolStore.getAdjectives(),
        // modals      : LolStore.getModalStates(),
        // statuses    : LolStore.getStatuses(),
        // info        : LolStore.getInfo(),
        // filters     : LolStore.getFilters(),
        // isMobile    : LolStore.isMobile()
    };
}

/**
 *
 */
var LolApp = React.createClass({
    getInitialState: getState,

    componentDidMount: function() {
        LolStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LolStore.removeChangeListener(this._onChange);
    },

   /**
    * @return {object}
    */
    render: function() {
  	    return (
            <div>
                <FilterModal
                    // status={this.state.statuses.filter}
                    // info={this.state.info}
                    // filters={this.state.filters}
                    // modal={this.state.modals.filter}
                />
                <Nav
                    // isMobile={this.state.isMobile}
                    // level={this.state.level}
                />
                <ScrollStage
                    // itemInFocus={this.state.current}
                    // autoplay={this.state.autoplay}
                    // seen={this.state.seen}
                    // isMobile={this.state.isMobile}
                    // feedbackStatus={this.state.statuses['feedback'] ? true : false}
                    // performers={this.state.performers}
                    // seen={this.state.seen}
                /> 
            </div>
  	    );
    },

   /**
    * Event handler for 'change' events coming from the LolStore
    */
    _onChange: function() {
        this.setState(getLolState());
    }
});

module.exports = LolApp;
