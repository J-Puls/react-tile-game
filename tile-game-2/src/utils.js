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

export const generateSquares = () => {
    const set = new Set();
    for (let i = 0; i < 60; i++) {
        let value = Math.floor(Math.random() * Math.floor(10) + 1);
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
        return val != item;
    })
    return newArr;
}

export const getWinner = (p1, p2, setWinner) => {
    if (p1 > p2) {
        setWinner(1);
    } else if (p1 < p2) {
        setWinner(2);
    } else if (p1 === p2) {
        setWinner(0)
    }
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
            return val != blockId;
        })
        setAvailI(newIndexes)
        setP1(p1s + value);
        console.clear();
        setTurn(2);
    }
}

export const init = (setAvailInd, setAvailSq, setSq) => {
    const indexes = generateIndexes();
    setAvailInd(indexes);
    const newSquares = generateSquares();
    setAvailSq(newSquares);
    setSq(newSquares);
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}