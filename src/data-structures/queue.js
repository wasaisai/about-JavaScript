class Queue {
    constructor() {
        this.tailIndex = 0;
        this.headIndex = 0;
        this.queueItem = [];
    }
    enqueue(element) {
        // 向队列尾部添加一个(或多个)新的项
        this.queueItem[this.tailIndex] = element;
        this.tailIndex++;
    }
    dequeue() {
        // 移除队列的第一项(即排在队列最前面的项)并返回被移除的元素
        if (this.isEmpty()) {
            return undefined;
        }

        let result = this.queueItem[this.headIndex];
        delete this.queueItem[this.headIndex];
        this.headIndex++;
        return result;
    }
    pop() {
        // 移除队列的最后一项(即排在队列最后面的项)并返回被移除的元素
        if (this.isEmpty()) {
            return undefined;
        }

        let result = this.queueItem[this.tailIndex];
        delete this.queueItem[this.tailIndex];
        this.tailIndex--;
        return result;
    }
    peek() {
        // 返回队列中的第一个元素——最先被添加, 也将是最先被移除的元素. 队列不做任何变动(不移除元素, 只返回元素信息——与stack类的peek方法类似)
        return this.queueItem[this.headIndex];
    }
    isEmpty() {
        // 如果队列中不包含任何元素, 返回true, 否则返回false
        return this.tailIndex - this.headIndex === 0;
    }
    size() {
        // 返回队列包含的元素个数, 与数组的length属性类似
        return this.tailIndex - this.headIndex;
    }
    clear() {
        this.queueItem = {};
        this.tailIndex = 0;
        this.headIndex = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.queueItem[this.headIndex]}`;
        for (let i = this.headIndex + 1; i < this.tailIndex; i++) {
            objString = ` ${objString} ${this.queueItem[i]}`;
        }
        return objString;
    }
    addFront(element) {
        // 在双端队列前端添加新元素
        if (this.isEmpty()) {
            this.enqueue(element);
        } else if (this.headIndex > 0) {
            // 一个元素已经从双端队列移除
            this.headIndex--;
            this.queueItem[this.headIndex] = element;
        } else {
            for (let i = this.tailIndex; i > 0; i--) {
                this.queueItem[i] = this.queueItem[i - 1];
            }
        }
        this.tailIndex++;
        this.headIndex = 0;
        this.queueItem[0] = element;
    }
}

// const queue = new Queue();
// queue.enqueue('7879');
// queue.enqueue('3');
// queue.enqueue('sdff');
// queue.addFront('nice');
// queue.peek();
// queue.size();
// queue.toString();


// 击鼓传花游戏:
// 孩子们围成一个圈, 把花尽快地传给旁边的人.某一时刻传花停止, 这个时候花在谁手里, 谁就退出圆圈、结束游戏.重复这个过程, 直到只剩一个孩子
function hotPotato(elementsList, num) {
    const queue = new Queue();
    const eliminatedList = [];

    for (let i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]);
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        eliminatedList.push(queue.dequeue());
    }

    return {
        eliminated: eliminatedList,
        winner: queue.dequeue()
    };

}


const names = ['zhangsan', 'lisi', 'jack', 'juli'];
hotPotato(names, 7);


// 判断字符串是否为回文
function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
        return false;
    }

    const deque = new Queue();
    const lowerString = aString.toLocaleLowerCase().split('').join('');
    let isEqual = true;
    let firstChar;
    let lastChar;

    for (let i = 0; i < lowerString.length; i++) {
        deque.enqueue(lowerString.charAt(i));
    }

    while (deque.size() > 0 && isEqual) {
        firstChar = lowerString.dequeue();
        lastChar = lowerString.pop();
        if (firstChar !== lastChar) {
            isEqual = false;
        }
    }
    return isEqual;
}

const romeCheck = 'eeedffff';
palindromeChecker(romeCheck);

