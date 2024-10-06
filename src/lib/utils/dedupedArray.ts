export default function dedupedArray(newItem: string, previousArray: string[]) {
    const set = new Set(previousArray);
    set.add(newItem);

    return [...set];
}
