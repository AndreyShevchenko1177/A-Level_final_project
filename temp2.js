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
