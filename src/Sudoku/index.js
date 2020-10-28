/**
 * @file 变色九宫格
 */
let colorList = [];
let gridList = [];
let intervalBox;

window.onload = function () {
    window.document.getElementById('start').onclick = function () {
        changeColor();
    };
    window.document.getElementById('stop').onclick = function () {
        clearInterval(intervalBox);
    };
};


function randomHexColor() { // 随机生成十六进制颜色
    if (colorList.length ===  3) {
        colorList.length = 0;
    }
    for (let i = 0; i < 3; i++) {
        let hex = Math.floor(Math.random() * 16777216).toString(16); // 生成ffffff以内16进制数
        // while循环判断hex位数，少于6位前面加0凑够6位
        while (hex.length < 6) {
            hex = '0' + hex;
        }
        colorList.push('#' + hex);
    }
}

function randomGrid() {
    if (gridList.length === 3) {
        gridList.forEach(label => {
            document.getElementById(label).style.backgroundColor = 'coral';
        });
        gridList.length = 0;
    }
    for (let j = 0; j < 3; j++) {
        gridList.push(Math.floor(Math.random() * 9 + 1));
    }
}

function changeColor() {
    clearInterval(intervalBox);
    intervalBox = setInterval(() => {
        randomHexColor();
        randomGrid();
        gridList.forEach((grid, index) => {
            document.getElementById(grid).style.backgroundColor = colorList[index];
        });
    }, 1000);
}