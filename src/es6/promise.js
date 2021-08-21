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


// function Bromise(executor) {
//     var onResolve_ = null;
//     var onReject_ = null;
//     this.then = function(onResolve, onReject) {
//         onResolve_ = onResolve;
//     }
//     function resolve( value) {
//         console.log(onResolve_)
//         onResolve_(value)
//     }

//     executor(resolve, null)
// }


function Bromise(executor) {
    var onResolve_ = null
    var onReject_ = null
     //模拟实现resolve和then，暂不支持rejcet
    this.then = function (onResolve, onReject) {
        onResolve_ = onResolve
    };
    function resolve(value) {
          setTimeout(()=>{
            onResolve_(value)
           },0)
    }
    executor(resolve, null);
}

function executor(resolve, reject) {
    resolve(100); 
}

let demo = new Bromise(executor)

function onResolve(value) {
    console.log('onResolve', value)
}

demo.then(onResolve)