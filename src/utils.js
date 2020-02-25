export const pickRandomIndex = (arr) => {
    let index;
    (arr.length > 0) ?
    index = Math.floor(Math.random() * Math.floor(arr.length)): index = arr[0];
    return index;
}

export const generateIndexes = () => {
    let indexes = [];
    for (let i = 0; i < 60; i++) {
        indexes.push(i)
    }
    return indexes;
}

export const generateSquares = (mode) => {
    let scale;
    switch (mode) {
        case 1:
            scale = 10;
            break;
        case 2:
            scale = 50;
            break
        case 3:
            scale = 100;
            break;
        default:
            break;
    }
    const set = new Set();
    for (let i = 0; i < 60; i++) {
        let value = Math.floor(Math.random() * Math.floor(scale) + 1);
        let square = {
            id: i,
            value: value,
            active: true
        };
        set.add(square);
    }
    return set;
}

export const findItem = (list, item) => {
    console.log("CPU picked:", item)
    for (let i of list) {
        if (i.id === item) {
            console.log("Found:", i)
            return i;
        }
    }
}

export const consumeSquare = (list, item, func, val) => {
    for (let x of list) {
        if (x === item) {
            x.active = false;
            func(val + x.value);
        }
    }
}

export const consumeIndex = (arr, item) => {
    const newArr = arr.filter(val => {
        return val !== item;
    })
    return newArr;
}

export const handleClick = (e, availS, sqs, setAvailSq, turn, availInd, setAvailI, setP1, p1s, setTurn) => {
    if (turn === 1) {
        const value = parseInt(e.target.textContent);
        const blockId = parseInt(e.target.getAttribute("index"));
        const newSquares = new Set(availS);
        for (const x of sqs) {
            if (x.id === blockId) {
                x.active = false;
                newSquares.delete(x);
                setAvailSq(newSquares);
            }
        }
        const newIndexes = availInd.filter(val => {
            return val !== blockId;
        })
        setAvailI(newIndexes)
        setP1(p1s + value);
        console.clear();
        setTurn(2);
    }
}

export const init = (setAvailInd, setAvailSq, setSq, mode) => {
    const indexes = generateIndexes();
    setAvailInd(indexes);
    const newSquares = generateSquares(mode);
    setAvailSq(newSquares);
    setSq(newSquares);
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Easy mode selects squares completely at random
export const easyModeSelection = (avail) => {
    const cpuIndex = pickRandomIndex(avail);
    const cpuSquareId = avail[cpuIndex];
    return cpuSquareId;
}

// Medium mode selects the most valuable from the first half of available
export const medModeSelection = (avail) => {
    avail = Array.from(avail);
    let cpuSquareId = 0;
    let highestVal = 0;
    for (let i = 0; i < Math.round(avail.length / 2); i++) {
        if (avail[i].value > highestVal) {
            highestVal = avail[i].value;
            cpuSquareId = avail[i].id;
        }
    }
    console.log("Highest value found: ", highestVal, cpuSquareId)
    return cpuSquareId;
}

// Hard mode selects the most valuable squares available
export const hardModeSelection = (avail) => {
    let cpuSquareId = 0;
    let highestVal = 0;
    for (let i of avail) {
        if (i.value > highestVal) {
            highestVal = i.value;
            cpuSquareId = i.id;

        }
    }
    console.log("Highest value found: ", highestVal, cpuSquareId)
    return cpuSquareId;
}

export const changeMode = (e, mode, setMode) => {
    const selectedMode = parseInt(e.target.getAttribute('value'));
    if (selectedMode !== mode) {
        setMode(selectedMode);
    }
}