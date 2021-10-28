
// const stackItem = new WeakMap();
// const stackCount = new WeakMap();
class Stack {
    constructor() {
        // 第一种方式: 创建基于数组的栈
        // this.stackItem = [];

        // 第二种方式: 创建基于js对象的类
        this.stackItem = {};
        this.count = 0

    //    stackItem.set(this, []);
    //    stackCount.set(this, 0)

    }
    push(element) {
        // 第一种方式
        // return this.stackItem.push(element);

       // 第二种方式
        this.stackItem[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        // 第一种方式
        // return this.stackItem.pop();

        // 第二种方式
        this.count--;
        const result = this.stackItem[this.count];
        delete this.stackItem[this.count];
        return result;
    }
    peek(element) {
        if (this.isEmpty()) {
            return undefined;
        }
        // 第一种方式
        // return this.stackItem[this.stackItem.length - 1];

        // 第二种方式
        return this.stackItem[this.count - 1];
    }
    isEmpty() {
        // 第一种方式
        // return this.stackItem.length === 0;

        // 第二种方式
        return this.count === 0;
    }
    size() {
        // 第一种方式
        // return this.stackItem.length;

        // 第二种方式
        return this.count;  
    }
    clear() {
        // 第一种方式
        this.stackItem = [];

        // 第二种方式
        this.stackItem = {}
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return undefined;
        }
        let objString = `${this.stackItem[0]}`;
        for(let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.stackItem[i]}`
        }
        return objString;
    }
}

// const stack = new Stack();

// stack.count;
// stack.push(5);
// stack.push(8);
// stack.push('f');
// stack.pop();
// stack.peek();
// stack.toString();
// stack.clear();


// 用栈解决问题: 把十进制转化成二进制

function decimalToBinary(decNumber, base) {
    const remStack = new Stack();
    let number = decNumber;
    const digts = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let rem;
    let binaryString = '';

    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    while (!remStack.isEmpty()) {
        binaryString += digts[remStack.pop()];
    }

    return binaryString;

}

decimalToBinary(10);
