/**
 * @file 集合
 * 没有重复元素、也没有顺序概念的数组
 */

class Set {
    constructor() {
        this.setItems = {};
    }
    add(element) {
        if(!this.has(element)) {
            this.setItems[element] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if(this.has(element)) {
            delete this.setItems[element];
            return true;
        }
        return false;
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.setItems, element);
    }
    clear() {
        this.setItems = {};
    }
    size() {
        let count = 0;
        for (let key in this.setItems) {
            if (this.setItems.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }
    values() {
        let values = [];
        for(let key in this.setItems) {
            if (this.setItems.hasOwnProperty(key)) {
                values.push(key);
            }
        }
        return values;
    }
    // 并集
    union(otherSet) {
        const resultSet = new Set();
        this.values().forEach(element => {
            resultSet.add(element);
        });
        otherSet.values().forEach(element => {
            resultSet.add(element);
        });
        return resultSet;
    }
    // 交集
    intersection(otherSet) {
        const resultSet = new Set();

        const thisValues = this.values();
        const otherValues = otherSet.values();

        let biggerSet = thisValues;
        let smallSet = otherValues;
        if (otherValues.length - thisValues.length > 0) {
            biggerSet = otherValues;
            smallSet = thisValues;
        }

        smallSet.forEach(element => {
            if (biggerSet.includes(element)) {
                resultSet.add(element);
            }
        });
        return resultSet;
    }
    // 差集
    difference(otherSet) {
        const resultSet = new Set();
        this.values().forEach(element => {
            if (!otherSet.has(element)) {
                resultSet.add(element);
            }
        });
        return resultSet;
    }
    // 子集: 假定当前元素setItems是给定元素otherSet的子集
    inSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = this.values().every(element => otherSet.has(element));
        return isSubset;
    }
}

const set = new Set();
const set2 = new Set();
set.add(3);
set.add('fefe');
set.add(4);
set2.add(100);
set2.add(200);
set2.add(300);
set2.add(3);
const a = set.union(set2);
const b = set.intersection(set2);
const c = set.difference(set2);
const d = set.inSubsetOf(set2)
// set.has(5);
// set.values();
// set.size();
// set.delete(3);
// set.clear();