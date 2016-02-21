export function getActiveTypes(types) {
    return [...types.map(type => {
        return type.active ? type.query : []
    })]
}
