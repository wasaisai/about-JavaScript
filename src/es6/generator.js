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