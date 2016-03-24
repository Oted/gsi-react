export function getActiveTypes(types) {
    return [].concat.apply([],[...types.map(type => {
        return type.active ? type.query : [];
    })]);
}

export function filterDuplicates(items) {
    let hash = {};

    return items.filter(function(item) {
        if (!item.title) {
            return true;
        }

        if (hash[item.title.toLowerCase()]) {
            return false;
        }

        hash[item.title.toLowerCase()] = true;
        return true;
    });
}

export function getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}
