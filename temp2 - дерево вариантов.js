//

let testArr = [
    ["USA", "Mexico"],
    ["Green", "Red", "Blue"],
    ["Metall", "Glass", "Plastic"],
];

function arrayOfTree(arr = []) {
    let iter = arr.reduce((a, b) => a * b.length, 1); // 18
    let res = Array.from(Array(iter), () => Array(arr.length)); // 18*3

    let step = iter;
    let i = 0;

    for (let k = 0; k < arr.length; k++) {
        step = step / arr[k].length; // 9, 3, 1
        // console.log("step - ", step);
        i = 0;
        for (let j = 0; j < iter; j++) {
            res[j][k] = arr[k][Math.floor(i++ / step) % arr[k].length];
        }
    }

    return res;
}

console.log(arrayOfTree(testArr));

// не боится пустого массива на входе

//////////////////
//////////////////
//////////////////
//////////////////
//////////////////
//////////////////

var list = [
    ["USA", "Mexico"],
    ["Green", "Red", "Blue"],
    ["Metall", "Glass", "Plastic"],
];
var tree = [];

list.forEach(function (listArrayValue, listKey) {
    let secondListKeyElement = 1;
    if (listKey === 0) {
        addElementsToSecondBranch(list, tree, secondListKeyElement, listArrayValue);
    }
});

function addElementsToSecondBranch(list, tree, secondListKeyElement, listArrayValue) {
    listArrayValue.forEach(function (branchKey) {
        tree[branchKey] = [];
        if (typeof tree[branchKey] !== "undefined" && typeof list[secondListKeyElement] !== "undefined") {
            addElementsToSecondBranch(list, tree[branchKey], secondListKeyElement + 1, list[secondListKeyElement]);
        }
    });
}

console.log(tree);

/////////////
/////////////
/////////////
/////////////
/////////////
/////////////
/////////////
/////////////

let testArr = [
    ["USA", "Mexico"],
    ["Green", "Red", "Blue"],
    ["Metall", "Glass", "Plastic"],
];

(() => {
    const inc = (indexes) => {
        let i;
        for (i = testArr.length - 1; i >= 0 && testArr[i].length <= (indexes[i] || 0) + 1; i--);
        if (i === -1) return NaN;
        indexes[i] = (indexes[i] || 0) + 1;
        i < testArr.length - 1 && (indexes[i + 1] = 0);
        return [...indexes];
    };

    let indexes = [0, 0, 0],
        result = [];

    do {
        result.push(indexes.map((i, j) => testArr[j][i || 0]));
    } while ((indexes = inc(indexes)));
    return result;
})();

for (let el of notes) {
    let d = document.createelement("div");
    body.append(d);
    d.append(el.text);
    d.classList.add("uk-table");
}
