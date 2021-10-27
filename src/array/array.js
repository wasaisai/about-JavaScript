// // // const a = [1, [1,2],[[1,2,3]], {name: 'zhangsan'}, '1'];
// // // const a =  [1,2,[1,2],[1,2,[1,2,3,{a:1}, undefined, null]]];

// // // console.log([].concat(...a));

// // // function planishing(arr) {
// // //     let result = [];
// // //     for( let i of arr) {
// // //         if(!(i instanceof Array)) {
// // //             result.push(i);
// // //         }else {
// // //             i.toString().split(',').map( item => result.push(item));
            
// // //         }
// // //     }
// // //     // for( let i of arr) {
// // //     //     if(!(i instanceof Array)) {
// // //     //         result.push(i);
// // //     //     }else if(i instanceof Array) {
// // //     //         planishing(i);
// // //     //     }else {
// // //     //         i.toString().split(',').map( item => result.push(item));
// // //     //     }
// // //     // }
// // //     return result;
// // // }
// // // console.log(planishing(a

arr = [
    {
        "男": 1
    }
]
// arr = [
//     {
//         "男": 1
//     },
//     {
//         "女": 1
//     },
//     {
//         "未知": 2
//     }
// ]
// arr = [
//     {
//         "男": 1
//     },
//     {
//         "女": 1
//     }
// ]

// arr =[];


// function dataCompatible(arr) {
//     let result=[{'男': ''},{'女': ''}, {'未知': ''}];
//     let total = 0;
//     for(let  i=0; i<arr.length; i++){
//         for(let j in arr[i]){
//             total += Number(arr[i][j]);
//         }
//     }

    // for(let x = 0; x < arr.length; x++){
    //     let key = Object.keys(arr[x]);
    //     //  let tempkey = (Object.value(arr[x])/total)*100+"%" ;
    //     //  result.push(temp);
    //     // for(let y in arr[x]){
    //     //     result[y]=(((arr[x][y])/total)*100+"%");
    //     // }
    // }
//     result.map(item => {
//         arr.map( (key, value) => {
            
//         })
//     })
//     return result;
// }

//    console.log(dataCompatible(arr));



function dataCompatible(arr) {
    let result=[];
    let myMap=[];
    let map=["男","女","未知"]
    let total=0

    for(let i=0;i<arr.length;i++){
        for(let j in arr[i]){
            total += Number(arr[i][j])
            myMap.push(j)
        }
    }
    for(let x=0;x<arr.length;x++){
        for(let y in arr[x]){
            arr[x][y] =(((arr[x][y])/total)*100+"%");
            result.push(arr[x]);
        }
   }
    let deffArr = myMap.concat(map).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
    for(let i=0;i<deffArr.length;i++){
        let temp = {};
        temp[deffArr[i]] = '0%';
        result.push(temp);
    }
    return result;
}

console.log(dataCompatible(arr));