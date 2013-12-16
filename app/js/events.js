var Core = require('core');

var Events = Core.extend({

    /** @constructor */
    constructor: function () {
        this._events = {};
    },

    on: function on(eventName, data, callback, context) {
        if (~eventName.indexOf(' ')) {
            var args = Array.prototype.slice.call(arguments),
                events = eventName.split(' ');
            for (var i = 0; i < events.length; ++i) {
                args[0] = events[i];
                on.apply(this, args);
            }
            return this;
        }

        if (typeof data === 'function') {
            context = callback;
            callback = data;
            data = undefined;
        }

        var calls = this._events,
            list = calls[eventName] || (calls[eventName] = []);

        list.push([callback, context, data]);
        return this;
    },

    off: function (eventName, callback) {
        if (arguments.length === 0) {
            this._events = {};
            return this;
        }

        if (arguments.length === 1) {
            this._events[eventName] = [];
            return this;
        }

        var calls = this._events,
            list = calls[eventName] || [];

        for (var i = 0; i < list.length; ++i) {
            if (list[i][0] === callback) list.splice(i, 1);
        }
        return this;
    },

    trigger: function (eventName) {
        var calls = this._events,
            list = calls[eventName] || (calls[eventName] = []),
            args = Array.prototype.slice.call(arguments, 1),
            res = [];

        for (var i = 0, length = list.length; i < length; ++i) {
            var context = list[i][1] || this,
                argsToSend = typeof list[i][2] === 'undefined' ? args : args.concat([list[i][2]]);
            res.push(list[i][0].apply(context, argsToSend));
        }
        return res;
    }

});

module.exports = Events;
