
var longestCommonPrefix = function(strs) {
    if (strs.length <= 0) {
        return;
    }
    const strBucktes = [];
    strs.forEach((strArray, index) => {
        strBucktes[index] = strArray.split('');
    })
    return compareFn(strBucktes);

    function compareFn(array) {
        if (array.length === 0) {
            return;
        }
        let publicStr = array[0];
        array.forEach((strChil, index) => {
            if(strChil.length === 0) {
                publicStr = ''
                return;
            }

            strChil.forEach((item, itemIndex) => {
                const strChilLength = strChil.length;
                const publicStrLength = publicStr.length;
                if (strChilLength > publicStrLength) {
                    strChil.splice(publicStrLength);
                } else {
                    publicStr.splice(strChilLength);
                }
                if (item !== publicStr[itemIndex]) {
                    publicStr.splice(itemIndex);
                }
            })
       })
        return publicStr;
    }
    
};

const a = longestCommonPrefix(["fl","fl",""]);
console.log(a);