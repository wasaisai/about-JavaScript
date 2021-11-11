/**
 * @file 背包问题
 */

function knapSack(capcity, weights, values, num) {
    const ks = [];
    for (let i = 0; i <= num; i++) {
        ks[i] = [];
    }
    for (let i = 0; i <= num; i++) {
        for (let w = 0; w <= capcity; w++) {
            if (i === 0 || w === 0) {
                ks[i] [w] = 0;
            } else if (weights[i - 1] <= w) {
                const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
                const b = ks[i - 1] [w];
                ks[i][w] = a > b ? a : b;
            } else {
                ks[i][w] = ks[i - 1][w];
            }
        }
    }
    return ks[num][capcity];
}