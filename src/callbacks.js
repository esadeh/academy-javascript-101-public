function EventEmitter(){
    this.callbacks = [];
    this.once_callbacks = [];

}
EventEmitter.prototype.addListener = function (event, listener){
//    if (! (event in this.callbacks)){
//        this.callbacks[event] = [];
//    }
//    this.callbacks[event].push(listener);
    this.addListenerToPool(this.callbacks, event, listener);
}

EventEmitter.prototype.once = function (event, listener) {
    this.addListenerToPool(this.once_callbacks, event, listener);

}

EventEmitter.prototype.addListenerToPool = function(pool, event, listener){
    if (! (event in pool)){
        pool[event] = [];
    }
    pool[event].push(listener);

}
EventEmitter.prototype.removeFromPool = function(pool, item){
    var index = (pool || []).indexOf(item);
    if(index != -1)
        pool.splice(index, 1);

}

EventEmitter.prototype.removeListener = function(event, listener){
    var index = (this.callbacks[event] || []).indexOf(listener);
    this.removeFromPool(this.callbacks[event], listener);
    this.removeFromPool(this.once_callbacks[event], listener);

}

EventEmitter.prototype.emit = function (event, data) {
    var that = this;

    function doEmit(pool) {
        (pool || []).forEach(function (item) {
            item.call(that, data);
        });

    }
    doEmit(this.callbacks[event]);
    doEmit(this.once_callbacks[event]);
    delete this.once_callbacks[event];
}


function ApproxyPi(){
    this.pi = 0;
    this.precision = 0;
}

ApproxyPi.prototype = new EventEmitter();

ApproxyPi.prototype.calc = function(afterDot) {
    this.emit('start', afterDot);
    this.precise = 1 / (Math.pow(10, afterDot));
    this.calcIndex = 0;
    this.precision = afterDot;
    this.calcCallback();

}


ApproxyPi.prototype.calcCallback = function(){
    var curr;
    for(var index = 0; index<5000; index++){
        curr =   ApproxyPi.getSeriesItem(this.calcIndex++);
        if (Math.abs(curr)<this.precise){
            this.emit('done', this.pi);
            return;
        }
        this.pi += curr;
        this.emit('progress', this.pi);
    }
    var that = this;
    setTimeout(function() {that.calcCallback()}, 0);
    return;

}

ApproxyPi.getSeriesItem = function(n){
        return 4 * ( Math.pow(-1, n) /
                (2*n+1) );

}