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