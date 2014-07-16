"use strict";
function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.addListener = function (event, callback) {
  if (callback) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  }
};


EventEmitter.prototype.emit = function (event, data) {
  var listeners = this._events[event] || [],
      self = this;
  listeners.forEach(function (listener) {
    listener.call(self, data);
  });
};

EventEmitter.prototype.once = function (event, callback) {
  var self = this,
      wrapper = function (data) {
        self.removeListener(event, wrapper);
        callback.call(self, data);
      };
  self.addListener(event, wrapper);
};

EventEmitter.prototype.removeListener = function (event, callback) {
  this._events[event] = _.without(this._events[event], callback)
};

function ApproxyPi() {
  EventEmitter.apply(this, arguments);
}

ApproxyPi.getSeriesItem = function (index) {
  var sign = index % 2 ? -1 : 1;
  return sign * 4 / (2 * index + 1);
};

ApproxyPi.prototype = new EventEmitter();
ApproxyPi.prototype.constructor = ApproxyPi;
ApproxyPi.prototype.pi = 0;
ApproxyPi.prototype.precision = 0;
ApproxyPi.prototype.calc = function (presicion) {
  function improvePrecision() {
    if (self.precision >= presicion) {
      self.emit('done');
    } else {
      for (var tmp = 0; tmp < 1000; tmp++) {
        self.pi += ApproxyPi.getSeriesItem(i++);
      }

      while (ApproxyPi.getSeriesItem(i) < Math.pow(10, -self.precision)) {
        self.precision++;
      }

      self.emit('progress');
      setTimeout(improvePrecision, 0);
    }
  }

  var i = 0,
      self = this;

  this.emit('start');
  improvePrecision();
};
