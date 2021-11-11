/**
 * @file 最少硬币找零问题
 */

function minCoinChange(coins, amount) {
    // 缓存——记忆化
    const cache = [];
    const makeChange = value => {
        if (!value) {
            // amount不为正, 返回空数组
            return [];
        }
        if (cache[value]) {
            // 若结果已缓存, 直接返回结果
            return cache[value];
        }
        let min = [];
        let newMin;
        let newAmount;
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            newAmount = value - coin;
            if (newAmount >= 0) {
                newMin = makeChange(newAmount);
            }
            if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                min = [coin].concat(newMin);
                console.log('new Min' + min + 'for' + newAmount);
            }
        }
        return (cache[value] = min);
    };
    return makeChange(amount);
}

const coins = [1, 5, 10, 20, 50];
const a = minCoinChange(coins, 3);
console.log(a);