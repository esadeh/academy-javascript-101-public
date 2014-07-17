function createMultiplier(multiplier) {
    function mul(num) {
        return num * mul.multiplyBy;
    }
    mul.multiplyBy = multiplier;
    return mul;
}

//function isFunction(functionToCheck) {
//    var getType = {};
//    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
//}
function createAllOfFilter(arr) {
    return function (arg) {
        var ans = true;
        if(arr) {
            var filtered = arr.filter(_.isFunction);
            filtered.forEach(function (item) {
                ans &= item(arg);
            });
        }
        return ans;
    };
}

function transformArray(array, conditionsArray, modifier) {
   // var filtered = array.filter(conditionsArray[0]);
    var filtered = array.filter(createAllOfFilter(conditionsArray));
    if (modifier) {
        filtered = filtered.map(modifier);
    }
    return filtered;
}