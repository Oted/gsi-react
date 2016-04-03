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
    var saveState = JSON.parse(JSON.stringify(state));

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
