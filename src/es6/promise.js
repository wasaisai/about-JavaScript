// setTimeout(() => {
//     console.log('d')
// }, 0);

// var r = new Promise(function(resolve, reject)  {
//     console.log('a');
//     resolve();
// })

// r.then(() => {
//     var begin = Date.now();
//     while(Date.now - begin < 1000) ;
//         console.log('c1');
//         new Promise(function (resolve, reject) {
//             resolve();
//         }).then(() => console.log('c2'))
    
// });
// // console.log('c');

// function sleep(duration) {
//     return new Promise(function(resolve, reject) {
//         console.log('c');
//         setTimeout(resolve, duration);
//     })
// }

// console.log('a');

// sleep(5000).then(() => console.log('c'))

// async function foo(name) {
//     await sleep(2000)
//     console.log(name)
// }

// async function foo2() {
//     await foo('zhangsan');
//     await foo('xiaohua');
// }

// foo2();

// const getJson = function(url) {
//     const promise = new Promise((resolve, reject) => {
//         const handler = function() {
//             if(this.readyStatus !== 4) {
//                 return;
//             }
//             if(this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//         const client = new XMLHttpRequest();
//         client.open('GET', url);
//         client.onreadystaechange = handler;
//         client.responseType = "json";
//         client.serRequestHeader('Accept', 'application/json');
//         client.send();
//     });
//     return promise;
// };

// function executor(resolve, reject) {
//     let rand = Math.random();
//     console.log(1);
//     console.log(rand);
//     if ( rand > 0.5) {
//         resolve();
//     } else {
//         reject();
//     }
// }

// var p0 = new Promise(executor);

// var p1 = p0.then( (value) => {
//     console.log('succeed-1');
//     return new Promise(executor)
// });

// var p3 = p1.then((value) => {
//     console.log('succeed-2');
//     return new Promise(executor)
// });

// var p4 = p3.then((value) => {
//     console.log('succeed-3');
//     return new Promise(executor)
// })

// p4.catch(error => {
//     console.log(error)
// })

// console.log(2)

// Promise实现了回调函数的延时绑定. 回调函数的延时绑定在代码上体现就是先创建Promise对象x1
// 通过Promise的构造函数exector来执行业务逻辑
// 创建好Promise对象x1之后, 再使用x1.then来设置回调函数
// 其次需要将回调函数Onresolve的返回值透穿到最外层

// promise对象的错误具有“冒泡”性质, 会一直向后传递, 直到被onReject函数处理或catch语句捕获为止. 

// function executor(resolve, reject) {
//     resolve(100)
// }

// let x1 = new Promise(executor)

// function onResolve1(value) {
//     console.log(value)
//     let x2 = new Promise((resolve, reject) => {
//         resolve(value + 1)
//     })
//     return x2
// }

// function onResolve2(value) {
//     console.log(value);
//     let x3 = new Promise((resolve, reject) => {
//         resolve(value + 2);
//     })
//     return x3;
// }

// x1.then(onResolve1).then(onResolve2).then(value => console.log(value))

// function onResolve(response) {console.log(response)}
// function onReject(error) {console.log(error)};

// let xhr = new XMLHttpRequest()

// xhr.ontimeout = function(e) { console.log(e)}
// xhr.onerror = function(e) { onReject(e)}
// xhr.onreadystatechange = function() { onResolve(xhr.response)}

// let url = 'https: //time.geekbang.com';
// xhr.open('Get', URL, true)

// xhr.timeout  = 3000;
// xhr.responseType = 'text';
// xhr.setRequestHeader('x_TEST', 'time.geekbang');

// xhr.send();

// function maskeRequest(request_url) {
//     let request = {
//         method: 'Get',
//         url: request_url,
//         headers: '',
//         body: '',
//         credentials: false,
//         sync: true,
//         responseType: 'text',
//         referrer: ''
//     }
//     return request;
// }

// function XFetch(request, resolve, reject) {
//     let xhr = new XMLHttpRequest();
//     xhr.ontimeout = error => {
//         reject(error)
//     };
//     xhr.onerror = error => {
//         reject(error)
//     };
//     xhr.onreadystatechange = () => {
//         if (+xhr.response === 200) {
//             resolve(xhr.response)
//         }
//     };
//     xhr.open(request.method, request.url, request.sync);
//     xhr.timeout = request.timeout;
//     xhr.responseType = request.responseType;
//     xhr.send();
// }

// function resolve(data) {
//     console.log(data)
// }

// function reject(error) {
//     console.log(error)
// }

// XFetch(maskeRequest('https://time.geekbang.org'), resolve, reject);



// function XFetch(request) {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.onerror = error => reject(error);
//         xhr.ontimeout = error => reject(error);
//         xhr.open(request.method, request.url, request.sync);
//         xhr.onreadystatechange = () => {
//            if (xhr.readyState === 4) {
//                 if (+xhr.response === 200) {
//                     resolve(xhr.response);
//                 } else {
//                     let error = {
//                         code: xhr.status,
//                         response: xhr.response
//                     }
//                     reject(error);
//                 }
//            }
//         };
//         xhr.send();
//     });
// }

// let x1 = XFetch(maskeRequest('https: //time.geekbang.org/?category'));

function executor(resolve) {
    let rand = Math.random();
    console.log(1);
    console.log(rand);
    if(rand > 0.5) {
        resolve();
    } else {
        // reject();
    }
}

// let p0 = new Promise(executor);

// let p1 = p0.then(value => {
//     console.log('succeed-1');
//     return new Promise(executor);
// })


// function Bromise(executor) {
//     var onResolve_ = null;
//     var onReject_ = null;
//     this.then = function(onResolve, onReject) {
//         onResolve_ = onResolve;
//     }
//     function resolve(value) {
//         onResolve_(value);
//     }
//     executor(resolve, null);
// }

// let p = new Bromise(executor);

function Prom(executor) {
    let onResolve_ = null;
    let onReject_ = null;
    this.then = function(resolve, reject) {
        onResolve_ = resolve;
        onReject_ = reject;
    }
    function resolve(value) {
        setTimeout(() => {
            onResolve_(value);
        }, 0);
    }
    function reject(error) {
        onReject_(error);
    }
    executor(resolve, reject);
}

function executor(resolve, reject) {
    resolve(100);
}

let test = new Prom(executor);

test.then(value => console.log(value));



