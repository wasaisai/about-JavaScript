
//theme.css
// div{ 
//     color : coral;
//     background-color:black
// }

// html文件
{/* <html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
</body>
</html> */}

// 打开这段html文件时的渲染流水线
/**
 * 1. 发起主页面的请求, 可能是渲染进程, 也有可能是浏览器进程, 发起的请求被送到网络进程中去执行
 * 2. 网络进程接收到返回的HTML数据之后, 将其发送给渲染进程
 * 3. 渲染进程会解析HTML数据并构建DOM, 请求HTML数据和构建DOM中间有一段空闲时间, 这个空闲时间有可能成为页面渲染的瓶颈
 * 4. 预解析线程解析出来一个外部theme.css文件, 并发起theme.css的下载. 这里也有一个空闲时间需要注意, 
 *    就是在DOM构建结束之后, theme.css文件还未下载完成的这段时间内, 渲染流水线无事可做, 因为下一步是合成布局树, 而合成布局树需要CSSOM和DOM, 
 *    所以这里需要等待css加载结束并解析成CSSOM
 * 5. 解析出CSSOM
 * 6. 创建布局树
 * 7. 样式计算: 渲染引擎为对应的DOM元素选择对应的样式信息
 * 8. 计算布局: 样式计算完成后, 渲染引擎还需要计算布局树中每个元素对应的几何位置,这个过程就是计算布局
 * 9. 通过样式计算和计算布局就完成了最终布局树的构建
 * 
 */


// 渲染流水线为什么需要CSSOM
/**
 * 渲染引擎无法直接理解CSS文件内容, 所以需要将其解析成渲染引擎能够理解的结构, 这个结构就是CSSOM.
 * 和DOM一样, CSSOM也具有两个作用, 第一个是提供给Javascript操作样式表的能力, 第二个是为布局树的合成提供基础的样式信息
 * 这个CSSOM体现在DOM中就是document.styleSheets.
 */

// 如何创建布局树
/**
 * 布局树的结构基本上就是复制DOM树的结构, 不同之处在于DOM树中那些不需要显示的元素会被过滤掉
 * 复制好基本的布局树结构之后, 渲染引擎会为对应的DOM元素选择对应的样式信息, 这个过程就是样式计算.
 */


// 备注: HTML预解析器识别出来有css文件和js文件需要下载, 然后同时发起这两个文件的下载请求, 需要注意的是, 这两个文件的下载过程是重叠的, 所以下载时间按照最久的那个文件来算
// 不管css文件和js文件谁先到达, 都要先等到css文件下载完成并生成CSSOM, 然后再执行js脚本, 最后再继续构建DOM, 构建布局树, 绘制页面


// 首次显示页面的内容, 在视觉上经历的三个阶段
/**
 * 第一个阶段: 等请求发出去后,, 到提交数据阶段, 这时页面展示出来的还是之前页面的内容;主要影响因素是网络和服务器处理
 * 第二个阶段: 提交数据之后渲染进程会创建一个空白页面, 我们通常把这段时间称为解析白屏, 并等待css文件和js文件的加载完成, 生成cssom和dom, 然后合成布局树, 最后还要经过一系列的步骤准备首次渲染
 *          主要瓶颈: 下载css文件、下载js文件和执行js
 *          优化策略: 通过内联js, 内联css来移除这两种类型的文件下载, 这样获取到HTML文件之后就可以直接开始渲染流程了
 *                   尽量减少文件大小, 比如通过webpack等工具移除一些不必要的注释, 并压缩js文件
 *                   对于大的css文件, 可以通过媒体查询属性, 将其拆分为多个不同用途的css文件, 这样只有在特定的场景下才会加载特定的css文件
 * 第三个阶段: 等首次渲染完成之后, 就开始进入完整页面的生成阶段了, 然后页面会一点点被绘制出来
 */



// 显示器是怎么显示图像的
/**
 * 每个显示器都有固定的刷新频率, 通常是60HZ, 也就是每秒更新60张图片, 更新的图片都来自于显卡中一个叫前缓冲区的地方, 显示器所做的任务很简单
 * 就是每秒固定读取60次前缓冲区的图像, 并将读取的图像显示到显示器上
 */

// 显卡: 
/**
 * 显卡的职责就是合成新的图像, 并将图像保存到后缓冲区, 一旦显卡把合成的图像写到后缓冲区, 系统会让后缓冲区和前缓冲区交换, 这样就能保证显示器能读取到最新显卡合成的图像
 * 通常情况下, 显卡的更新频率和显示器的刷新频率是一致的. 但有时候, 在一些复杂的场景中, 显卡处理一张图片的速度会变慢, 这样就会造成视觉上的卡顿
 */


// 帧VS频率
/**
 * 大多数设备屏幕的更新频率是60次/秒, 这也就意味着正常情况下要实现流畅的动画效果, 渲染引擎需要每秒更新60张图片到显卡的后缓冲区
 * 我们把渲染流水线生成的每一副图片称为一帧, 把渲染流水线每秒更新了多少帧称为帧率, 比如滚动过程中1秒更新了60帧, 那么帧率就是60HZ(或者60FPS)
 * 要解决卡顿问题, 就要解决每帧生成时间过久的问题, 为此chrome对浏览器渲染方式做了大量的工作, 其中最卓有成效的策略就是引入了分层和合成机制.分层和合成机制代表了当今最先进的渲染技术
 */


// 分层体现在生成布局树之后, 渲染引擎会根据布局树的特点将其转换为层数(Layer tree), 层树是渲染流水线后续流程的基础结构
// 层树中的每个节点对应着一个图层, 下一步的绘制阶段就依赖于层树中的节点

// 光栅化就是按照绘制列表中的指令生成图片. 每一个图层都对应一张图片, 合成线程有了这些图片之后, 会将这些图片合成为“一张“图片, 并最终将生成的图片发送到后缓冲区.
// 合成操作是在合成线程上完成的, 这也就意味着在执行合成操作的时, 是不会影响到主线程执行的. 这就是为什么经常主线程卡住了, 但是css动画依然能执行的原因

// 分块
/**
 * 如果说分层是从宏观上提升了渲染效率, 那么分块则是从微观层面提升了渲染效率
 * 背景: 通常情况下, 页面的内容都要比屏幕大得多, 显示一个页面时, 如果等待所有的图层都生成完毕, 再进行合成的话, 会产生一些不必要的开销, 也会让合成图片的时间变得更久
 * 因此, 合成线程会将每个图层分割为大小固定的的图块, 然后优先绘制靠近视口的图块, 这样就可以大大加速页面的显示速度.不过有时候, 即使只绘制那些优先级最高的图块, 也要耗费不少的时间
 * 因为涉及到一个很关键的因素--纹理上传, 这是因为从计算机内存上传到GPU内存的操作会比较慢
 *     为了解决这个问题, Chrome又采取了一个策略: 在首次合成图块的时候使用一个低分辨率的图片. 比如可以是正常分辨率的一半, 分辨率减少一半, 纹理就减少了四分之三. 在首次显示页面内容
 * 的时候, 将这个低分辨率的图片显示出来, 然后合成器继续绘制正常比例的网页内容, 当正常比例的网页内容绘制完成后, 再替换掉当前显示的低分辨率内容
 */



// 代码优化
/**
 * 可能需要对元素做几何形状的变换、透明度变换或者一些缩放操作, 如果使用JavaScript来写这些效果, 会牵涉到整个渲染流水线, 所以JavaScript的绘制效率会非常低下
 * 可以使用will-change告诉渲染引擎可能会对元素做一些特效变换: .box{ will-cahnge: transform, opacity;}
 */