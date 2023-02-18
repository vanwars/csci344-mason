class SuperArray extends Array {

    map1(callback) {
        const newArray = new SuperArray();
        // TODO
        for (let i = 0; i < this.length; i++) {
            newArray.push(
                callback(this[i], i, this)
            )
        }
        return newArray;
    }

    filter1(callback) {
        // TODO
        const newArray = new SuperArray();
        for (let i = 0; i < this.length; i++) {
            if(callback(this[i]) == true) {
                newArray.push(this[i]);
            }
        }
        return newArray;
    }

    reduce1(callback) {
        // TODO
    }

}

function dataTransform(item) {
    return item ** 3;
}

const myArray = new SuperArray(1, 2, 3, 4, 5);
const newArray = myArray.map1(dataTransform);
console.log(newArray);
console.log("Actual:", myArray.filter(item => item > 2));
console.log("Expected:", [3, 4, 5]);
