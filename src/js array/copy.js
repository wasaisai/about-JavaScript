// 单层对象深拷贝
const person1 = {
    name: 'zhangsan',
    age: 32,
    sex: 'nan'
}
function copy (source) {
    // let result = Object.assign({}, source);
    // let result = JSON.parse(JSON.stringify(source))
    // let result = {};
    // for( let item in source) {
    //     result[item] = source[item]
    // }
    let result = {...source};
    
    return result
}
// const person2 = copy(person1);
// person2.name = 'lisi';
// console.log(person1.name)
// console.log(person2)



// 单层数组拷贝
const arr1 = [1, 2, 3, 4];
function copyArr(source) {
    let result = [];
    // let result = JSON.parse(JSON.stringify(source))
    // let result  = arr1.slice()
    // let result = arr1.concat()
    for( let item in source) {
        result.push(source[item])
    }
    return result;
}
// const arr2 = copyArr(arr1);
// arr2[0] = 'vaebaerg';
// console.log(arr1[0]);
// console.log(arr2)


//多层数组/对象拷贝

let jack = {
    mather: 'xiaohong',
    like: {
        dog: {
            name: 'goudan',
            age: 1
        },
        cat: {
            name: 'huahua',
            age: 2
        }
    },
    friends: ['zhangsan', 'lisi', 'tiejun'],
    sports: ['basketball', 'run', 'football'],
    relax: function (){
        console.log(this.sports);
    }

}
function deepCopy(source) {
    // if( typeof source !== 'object' || typeof source !== 'function') return;
    const result = source.constructor === 'Array' ? [] : {};
    // for( let item in source) {
    //     console.log(item)
    //     if (typeof source[item] === 'object') {
    //         deepCopy(source[item]);
    //     } else {
    //         // console.log(item)
    //         result [item] = source[item];
    //     }
    // }
    console.log(result)
    for (let i = 0; i < result.length; i ++) {
        if(typeof source[result[i]] === 'object') {
            deepCopy(source[result[i]])
        } else {
            result[i] = source[result[i]];
            // console.log(result[i])
        }
    }

    return result;
}

let jack2 = deepCopy(jack);
jack2.mather = 'xiaolan';

// jack.relax();
// console.log(jack2)
// jack2.relax();