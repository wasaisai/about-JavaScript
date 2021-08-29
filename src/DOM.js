// 什么是dom: 从网络传给渲染引擎的html文件字节流是无法被渲染引擎理解的, 所以要将其转化为渲染引擎能够理解的内部结构, 这个结构就是DOM, DOM提供了对HTML文档结构化的表述, 在渲染引擎中, DOM有三个层面的作用
/**
 * 1. 从页面的视角来看, DOM是生成页面的基础数据结构
 * 2. 从Javascript脚本视角来看, DOM提供给javascript脚本操作的接口, 通过这套接口, javascript可以对dom结构进行访问, 从而改变文档的结构、样式和内容
 * 3. 从安全视角来看, DOM是一道安全防护线, 一些不安全的内容在dom解析阶段就被拒绝
 * 总结: DOM是表述HTML的内部数据结构, 它会将Web页面和Javascript脚本连接起来, 并过滤一些不安全的内容
 */


// HTML 解析器是等整个 HTML 文档加载完成之后开始解析的，还是随着 HTML 文档边加载边解析的？
/**
 * 答:  HTML解析器并不是等整个文档加载完成之后再解析, 而是网络进程加载了多少数据, HTML解析器便解析多少数据
 * 1. 网络进程接受到响应头之后, 会根据响应头中的content-type字段来判断文件的类型
 *    1.1 比如content-type的值是‘text/html, 那么浏览器会判断这是一个html类型的文件,然后为该请求选择或者创建一个渲染进程
 * 2. 渲染进程准备好之后, 网络进程和渲染进程之间会建立一个共享数据的管道
 *    2.1 网络进程接收到数据后就往这个管道里面放, 而渲染进程则从管道的另一端不断地读取数据, 并同时将读取的数据“喂”给HTML解析器
 */

// 代码从网络传输过来是字节流的形式, 字节流转换为DOM需要三个阶段
/**
 * 1. 通过分词器将字节流转换为Token
 *    1.1 V8编译Javascript过程中的第一步是做词法分析, 将javascript先分解为一个个Token. 解析HTML也是一样, 需要通过分词器先将字节流转换为一个个token, 分为Tag Token和文本Token
 *    1.2 tag Token又分StartTag和EndTag
 * 2. 3. 是同步进行的, 需要将Token解析为DOM节点, 并将DOM节点添加到DOM树中
 */


// Token 栈结构: 主要用来计算父子关系, 在第一个阶段中生成的token会被按照顺序压到这个栈中
/**
 * 1. 如果压入到栈中的是StartTag Token, HTML解析器会为该Token创建一个DOM节点, 然后将该节点加入到DOM树中, 它的父节点就是栈中相邻的那个元素生成的节点
 * 2. 如果分词器解析出来是文本Token, 那么会生成一个文本节点, 然后将该节点加入到DOM树中, 文本Token是不需要压入到栈中, 它的父节点就是当前栈顶Token所对应的DOM节点
 * 3. 如果分词器解析出来的是EndTag标签, 比如是EndTag div, HTML解析器会查看TOken栈顶的元素是否是StartTag div, 如果是, 就将StartTag div从栈中弹出, 表示该div元素解析完成
 * 
 * 通过分词器产生的新Token就这样不停地压栈和出栈, 整个解析过程就这样一直持续下去, 知道分词器将所有字节流分词完成.
 * HTML解析器开始工作时, 会默认创建一个根为空document的空dom结构, 同时会将一个StartTag document的Token压入栈底. 然后经过分词器解析出来的第一个StartTag html Token会被压入栈中, 并创建一个html的DOM节点, 添加到document上
 * 
 */



// Javascript是如何影响DOM生成的
/**
 * 1. Javascript文件的下载过程会阻塞DOM解析
 * 2. 解析到Script标签时, 渲染引擎判断这是一段脚本, 此时HTML解析器就会暂停DOM的解析, 因为接下来的Javascript可能要修改当前已经生成的DOM结构
 */

// 预解析操作: 当渲染引擎收到字节流之后, 会开启一个预解析线程, 用来分析HTNL文件中包含的Javascript、css等相关文件, 解析道相关文件之后, 预解析线程会提前下载这些文件

// async defer
/**
 * 共同点: 异步加载文件
 * 区别: async标志的是脚本文件一旦加载完成, 会立即执行; 使用defer标记的脚本文件, 需要在DOMContentLoaded事件之前执行
 */



/**
 * <html>
    <head>
        <style src='theme.css'></style>
    </head>
<body>
    <div>1</div>
    <script>
            let div1 = document.getElementsByTagName('div')[0]
            div1.innerText = 'time.geekbang' //需要DOM
            div1.style.color = 'red'  //需要CSSOM
        </script>
    <div>test</div>
</body>
</html>

 */

// 该示例中, JavaScript代码出现了div1.style.color = 'red'的语句, 它是用来操纵CSSOM的, 所以在运行Javascript之前, 需要先解析JavaScript语句之上所有的css样式
// 所以如果代码里引用了外部的css文件, 那么在执行JavaScript之前, 还需要等待外部的css文件下载完成, 并解析生成CSSOM对象之后, 才能执行Javascript脚本


// 虚拟dom解决的问题:
/**
 * 1. 将页面改变的内容应用到虚拟dom上, 而不是直接应用到dom上
 * 2. 变化被应用到虚拟dom上时, 虚拟dom并不急着去渲染页面, 而仅仅是调整虚拟dom的内部状态, 这样操作虚拟dom的成本就非常低了
 * 3. 在虚拟dom收集到足够的改变时, 再把这些变化一次性应用到真实的dom上
 */



// DOM事件流
/**
 * 事件流: 描述的是事件在页面中传播的顺序
 * 事件: 描述的是发生在浏览器里的动作. 这个动作可以是用户触发的, 也可以是浏览器触发的,像点击(click)、鼠标悬停(mouseover)、鼠标移走(mousemove)这些都是事件
 * 事件监听函数: 事件发生后, 浏览器如何响应——用来应答事件的函数, 就是事件监听函数, 也叫事件处理程序
 */

// W3C标准约定了一个事件的传播过程要经过以下三个阶段: 
/**
 * 1. 事件捕获阶段
 * 2. 目标阶段
 * 3. 事件冒泡阶段
 */

// 当DOM接受了一个事件、对应的事件处理函数被触发时, 就会产生一个事件对象event作为处理函数的入参.这个对象中囊括了与事件有关的信息, 比如事件具体是由那个元素所触发、事件的类型等等.


// currentTarget
/**
 * 它记录了事件当下正在被那个元素接收, 即“正在经过那个元素”.这个元素是一直在改变的, 因为事件的传播毕竟是个层层穿梭的过程
 * 如果事件处理程序绑定的元素, 与具体的触发元素是一样的, 那么函数中的this、 event.currentTarget和event.target三个值是相同的.我们可以以此为依据, 判断当前的元素是否就是目标元素
 */

// target
/**|
 * 指触发事件的具体目标, 也就是最具体的那个元素, 是事件的真正来源
 * 就算事件处理程序没有绑定在目标元素上、而是绑定在了目标元素的父元素上, 只要它是由内部的目标元素冒泡到父容器上触发的, 那么我们仍然可以通过target来感知到目标元素才是事件真实的来源
 */


// preventDefault 阻止默认行为
/**
 * 这方法用于阻止特定事件的默认行为, 如a标签的跳转等
 * e.preventDefault();
 */

// stopPropagation 不再派发事件
/**
 * 这个方法用于终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播, 调用该方法齁, 该节点上处理该事件的处理程序将被调用, 事件不再被分派到其他节点
 */

// 频繁触发回调导致的大量计算会引发页面的抖动甚至卡顿.为了规避这种情况, 我们需要一些手段来控制事件被触发的频率.就是在这样的背景下, throttle(事件节流)和debounce(事件防抖)出现了
// 事件节流和事件防抖适宜闭包的形式存在: 他们通过对事件对应的回调函数进行包裹、以自由变量的形式缓存时间信息, 最后用setTimeout来控制事件的触发频率

// Throttle: 第一个人说了算, 在某段时间内, 不管你触发了多少次回调, 我都只认第一次, 并在计时结束时给予响应
/**
 * 所谓的“节流”, 是通过在一段时间内无视后来产生的回调请求来实现的. 例如每当用户触发了一次scroll事件, 我们就为这个触发操作开启计时器. 一段时间内, 后续所有的scroll事件都会被当作
 * 第一次触发的scroll事件, 它们无法触发新的scroll回调. 直到“一段时间”到了, 第一次触发的scroll事件对应的回调才会执行, 而“一段时间内”触发的后续的scroll回调都会被节流阀无视掉 
 */

// fn是需要包装的事件回调, interval是时间间隔的阀值
function throttle(fn, interval) {
    // last为上一次触发回调的时间
    let last = 0;
    return function() {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间
        let now = +new Date()
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阀值
        if ( now - last >= interval) {
            // 如果时间间隔大于我们设定的时间间隔阀值, 则执行回调
            last = now;
            fn.apply(context, args)
        }
    }
}


// Debounce: 最后一个人说了算
/**
 * 防抖的中心思想在于: 我会等你到底, 在某段时间内, 不管你触发了多少次回调, 我都只认最后一次
 * 例如: 第一个乘客上车后, 司机开始计时(比如说十分钟). 十分钟之内, 如果又上来了一个乘客, 司机会把计时器清零, 重新开始等另一个十分钟(延迟了等待).
 * 直到有一位乘客, 从他上车开始, 后续十分钟都没有新乘客上车, 司机会认为确实没有人需要搭这趟车了, 才会把车开走.
 */

// fn是需要包装的事件回调, delay是每次推迟执行的等待时间
function Debounce(fn, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}