// function clearLocal() {
//     localStorage.clear();
// }
//
// function addItem(a, b) {
//     localStorage.setItem(a, b);
// }
// function removeItem(a){
//     localStorage.removeItem(a);
// }

class Storage {
    constructor() {
        this.length = localStorage.length;
    }
    clear() {
        localStorage.clear();
        this.length = 0;
    }

    add(a, b) {
        localStorage.setItem(a, b);
        this.length++;
    }
    remove(a) {
        localStorage.removeItem(a);
        this.length--;
    }
    getList() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
    }
    itemDone(a) {
        var keys = Object.keys(localStorage),
            i = keys.length;

        let obj = JSON.parse(localStorage.getItem(keys[i - a - 1]));
        obj.done = true;
        localStorage.setItem(keys[i - a - 1], JSON.stringify(obj))
    }
    itemUndo(a) {
        var keys = Object.keys(localStorage),
            i = keys.length;

        let obj = JSON.parse(localStorage.getItem(keys[i - a - 1]));
        obj.done = false;
        localStorage.setItem(keys[i - a - 1], JSON.stringify(obj))
    }
    delete(a) {
        var keys = Object.keys(localStorage),
            i = keys.length;

        this.remove(keys[i - a - 1]);
    }
}
