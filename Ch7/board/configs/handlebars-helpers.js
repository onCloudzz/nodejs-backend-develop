module.exports ={
    lengthOfList: (list = []) => list.length,
    eq: (a, b) => a === b,
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};