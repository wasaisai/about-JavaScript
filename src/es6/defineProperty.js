const obj = {
    name: 'xiaohua',
    age: 13
}

Object.defineProperty(obj, 'name', {
    get() {
        console.log('尝试修改')
    },
    set(newValue) {
    console.log('new name: ' + newValue);
    }
})

obj.name = '张三'
console.log(obj.name)