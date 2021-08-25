/**
 * 生成器是一个带星号函数, 而且是可以暂停执行和恢复执行的
 * 1. 在生成器函数内部执行一段代码, 如果遇到yield关键字, 那么javascript引擎将返回关键字后面的内容给外部, 并暂停该函数的执行
 * 2. 外部函数可以通过next方法恢复函数的执行
 */

function* genDemo() {
    console.log('start one');
    yield 'gengrator 2'

    console.log('start two');
    yield 'generator 2'

    console.log('start three');
    yield  'generator 2'

    console.log('result');
    return 'generator 2'
}

console.log('main 0')

let gen = genDemo();
console.log(gen)

console.log(gen.next().value);
console.log('main 1')
console.log(gen.next().value);
console.log('main 2');
console.log(gen.next().value);
console.log('main 3');
console.log(gen.next().value);
console.log('main 4');

/**
 * 协程: 是一种比线程更加轻量级的存在. 可以把协程看成是跑在线程上的任务, 一个线程上可以存在多个协程, 但是在线程上同时只能执行一个协程
 * 比如当前执行的是A协程, 要启动B协程, 那么A协程就需要将主线程的控制权交给B协程, 这就体现在A协程暂停执行, B协程恢复执行;同样也可以从B协程中启动A协程. 
 * 如果从A协程启动B协程, 我们就把A协程称为B协程的父协程
 * 
 * 正如一个进程可以拥有多个线程一样, 一个线程也可以拥有多个协程. 最重要的是, 协程不是被操作系统内核所管理, 而完全是由程序所控制(也就是在用户态执行). 
 * 这样带来的好处是性能得到了很大的提升, 不会像线程切换那样消耗资源
 * 
 */

/**
 * genDemo的执行过程
 * 1. 通过调用生成器函数genDemo来创建一个协程gen, 创建之后, gen协程并没有立即执行
 * 2. 要让gen协程执行, 需要通过调用gen.next
 * 3. 当协程正在执行的时候, 可以通过yield关键字来暂停gen协程的执行, 并返回主要信息给父协程
 * 4. 如果协程在执行期间, 遇到了retuen关键字, 那么JavaScript引擎会结束当前协程, 并将return后面的内容返回给父协程
 */

/**
 * 协程间的交互
 * 1. gen协程和父协程是在主线程上交互执行的, 并不是并发执行, 它们之间的切换是通过yield和gen.next来配合完成的
 * 2. 当gen协程中调用了yield方法时, Javascript引擎会保存gen协程当前的调用栈信息, 并恢复父协程的调用栈信息. 同样没当在父协程中执行gen.next时, javascript引擎会保存父协程的调用栈信息, 并恢复gen协程的调用栈信息
 */


/**
 * async/await这种方式能够彻底告别执行器和生成器, 实现更加直观简洁的代码
 * 其实async/await技术背后的秘密就是Promise和生成器应用, 往低层说就是微任务和协程应用
 *
 */

// async: 是一个通过异步执行并隐式返回promise作为结果的函数
async function async1() {
    return 2;
}

console.log(async1());


async function await1() {
    console.log(1);
    let a = await 100;
    console.log(a);
    console.log(2);
}

console.log(0);
await1();
console.log(3);

/**
 * 代码执行流程:
 * 1. 执行console.log(0)这个语句, 打印出来0
 * 2. 执行await1函数, 由于await1函数是被async标记过的, 所以当进入该函数的时候, JavaScript引擎会保存当前的调用栈等信息, 然后执行fawait1函数中的console.log(1)语句, 并打印出1
 * 3. 当执行到await1中的await 100这个语句时, 会默认创建一个promise对象: let promise_ = new Promise((resolve, reject) => resolve(100)) })
 *    3.1: 在这个promise_对象创建的过程中, 我们可以看到在executor函数中调用了resolve函数, javascript引擎会将该任务提交给微任务队列
 *    3.2: 然后Javascript引擎会暂停当前协程的执行, 将主线程的控制权转交给父协程执行, 同时会将promise_对象返回给父协程
 * 4. 主线程的控制权已经交给父协程了, 这时候父协程要做的一件事是调用promise_.then来监控promise状态的改变
 * 5. 接下来继续执行父协程的流程, 执行console.log(3), 并打印出3.
 * 6. 随后父协程将执行结束, 在结束之前, 会进入微任务的检查点, 然后执行微任务队列, 微任务队列中有resolve(100)的任务等待执行, 执行到这里的时候, 会触发promise_.then中的回调函数: 
 *    6.1 promise_.then(value => {
 *            // 回调函数被激活后
 *            // 将主线程控制权交给foo协程, 并将value值传给协程
 *        })
 * 7. 该回调函数被激活后, 会将主线程的控制权交给await1函数的协程, 并同时将value值传给该协程
 * 8. await1协程激活后, 会把刚才的value赋值给变量a, 然后await协程继续执行后续语句, 执行完成之后, 将控制权归还给父协程
 */


/**
 * promise的编程模型依然充斥着大量的then方法, 虽然解决了回调地狱的问题, 但是在语义方面依然存在缺陷, 代码中充斥着大量的then函数, 这就是asyn/wait出现的原因
 */



async function foo() {
    console.log('foo');
}

async function bar() {
    console.log('bar start');
    await foo();
    console.log('bar end');
}

console.log('script start');
setTimeout(function() {
    console.log('settimeout');
}, 0)

bar();
new Promise(function(resolve) {
    console.log('promise executor');
    resolve();
}).then(function() {
    console.log('promise then');
})
console.log('script end');