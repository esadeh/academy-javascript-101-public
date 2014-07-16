function createMultiplier(multiplier){
    function mul(num){
        return num*mul.multiplyBy;
    }
    mul.multiplyBy = multiplier;
    return mul;
}
//function isFunction
function createAllOfFilter(arr){
    var filtered = arr.filter()
    return function(){
        return true;
    };
}