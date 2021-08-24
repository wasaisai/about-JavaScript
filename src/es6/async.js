/**
 * 产生async、await的原因: promise很好的解决了回调地狱的问题,但是这种方式充满了promise的then()方法
 * 如果处理流程比较复杂的话, 那么整段代码将充斥着then
 * 语义化不明显, 代码不能很好地表示执行流程
 * 
 * 定义: async、await是javascript异步编程的一个重大改进, 提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力, 并且使得代码逻辑更加清晰
 * */

function fetch(url) {
    let request = {
        method: 'Get',
        url: url,
        headers: '',
        body: '',
        credentials: false,
        sync: true,
        responseType: 'text',
        referrer: ''
    }
    let xhr = new XMLHttpRequest();
    xhr.ontimeout = err => console.log(err);
    xhr.onerror = err => console.log(err);
    xhr.onreadystaechange = function() {
        console.log(xhr.response)
    };
    xhr.open(request.method, request.url, request.sync);

}

async function foo() {
    try {
        let response1 = await fetch('https: //www.geekbang.org')
        console.log('respons1');
        console.log(response1);
        let response2 = await fetch('https://www.geekbang.org/test');
        console.log('respons2');
        console.log(response2)
    } catch (err) {
        console.log(err)
    }
}

foo();