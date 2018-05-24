
let randomizeArray = (array) => {
    let _array = Object.assign([], array);
    for (let maxIndex = _array.length; maxIndex > 1; maxIndex--) {
        let nextIndex = Math.floor(Math.random() * maxIndex);
        let element = _array[nextIndex];
        _array[nextIndex] = _array[maxIndex-1];
        _array[maxIndex-1] = element;
    }
    return _array;
}

let getNRandomElements = (array, n) => {
    let _array = Object.assign([], array);
    let randomElements = [];
    let maxIndex = _array.length;
    let _n = _array.length > n ? n : _array.length;
    for (let i = 0; i < n; i++) {
        let nextIndex = Math.floor(Math.random() * maxIndex);
        randomElements.push(_array[nextIndex]);
        _array[nextIndex] = _array[maxIndex-1];
        maxIndex--;
    }
    return randomElements;
}

let isUniqElements = (array) => {
    let isUniq = true;
    let nextIndex = 0;
    while (isUniq && nextIndex < array.length) {
        let index = nextIndex + 1;
        while (isUniq &&  index < array.length) {
            isUniq = (array[nextIndex] !== array[index]);
            index++;
        }
        nextIndex++;
    }
    return isUniq;
}

module.exports = {
    getNRandomElements: getNRandomElements,
    randomizeArray: randomizeArray,
    isUniqElements: isUniqElements
}
