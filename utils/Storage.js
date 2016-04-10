/**
 *  Gets the current seen storage
 */
export function loadState() {
    return JSON.parse(localStorage.getItem("state") || '{}');
};

/**
 *  Saves the current state
 */
export function saveState(state) {
    let seenThreshold = 1000;
    var saveState = JSON.parse(JSON.stringify(state));

    Object.keys(saveState.seen).forEach(hash => {
        if (state.lists[hash] && state.lists[hash].query.results < seenThreshold) {
            delete saveState.seen[hash];
        }
    });

    delete saveState.fragments;
    delete saveState.suggestions;
    delete saveState.single_view;
    delete saveState.is_mobile;
    delete saveState.search;
    delete saveState.lists;
    delete saveState.queries;
    delete saveState.suggest_view;

    localStorage.setItem("state", JSON.stringify(saveState));
}
