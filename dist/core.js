/*!
 * CoreJS
 * http://corejs.github.io/
 * (c) Ivan Indamix; MIT License
 */

/** @define {boolean} */
var DEV_MODE = true;

(function () {

    var registry = {},
        slice = Array.prototype.slice,
        C = function () {};

    var Core = function (arg) {
        if (arguments.length === 2 && typeof arg === 'string') {
            return Core.register(arg, arguments[1]);
        }

        if (typeof arg === 'string') {
            return registry[arg];
        } else if (Array.isArray(arg)) {
            var res = new Array(arg.length);
            for (var i = arg.length; i--;) {
                if (typeof arg[i] !== 'string') return wrapper(arg);
                res[i] = registry[ arg[i] ];
            }
            return res;
        } else {
            return arg;
        }
    };

    Core.extend = function (proto) {
        var parent = this,
            child;
        if (typeof proto === 'function') {
            child = proto;
            proto = proto.prototype;
        } else {
            if (proto.constructor === Object) { // no constructor specified
                proto.constructor = function(){ parent.apply(this, arguments) };
            }
            child = wrapper(proto.constructor);
        }

        C.prototype = parent.prototype;
        child.prototype = new C();
        delete C.prototype; // unlink parent.prototype to prevent memory leaks

        var props = Object.getOwnPropertyNames(proto);
        for (var i = props.length; i--;) {
            var desc = Object.getOwnPropertyDescriptor(proto, props[i]);
            desc.value = wrapper(desc.value);
            Object.defineProperty(child.prototype, props[i], desc);
        }

        child.extend = parent.extend;
        child.register = parent.register;

        child.prototype.constructor = child;
        child.superclass = parent.prototype;
        return child;
    };

    Core.register = function (name, entity) {
        registry[name] = entity;
    };

    Core.unregister = function (name) {
        delete registry[name];
    };

    Core.reset = function () {
        registry = {};
    };

    var wrapper = function (fn) {
        if (_isArray(fn)) {
            var injected = fn;
            fn = fn.pop();
        } else if (typeof fn !== 'function' || !Array.isArray(fn.$inject)) {
            return fn;
        }

        return function () {
            var dependencies = new Array(injected.length);
            for (var i = dependencies.length; i--;) {
                dependencies[i] = registry[ injected[i] ];
            }
            return fn.apply(this, dependencies.concat(slice.call(arguments)));
        };
    };

    var _isArray = function (a) {
        if (!Array.isArray(a) || a.length < 2 || typeof a[a.length - 1] !== 'function') return false;
        for (var i = a.length - 1; i--;) {
            if (typeof a[i] !== 'string') return false;
        }
        return true;
    };

    if (DEV_MODE) {
        var script = document.scripts[document.scripts.length - 1],
            src = script.dataset && script.dataset.main || script.getAttribute('data-main'),
            path = /(?:(.*\/))?(.*)/.exec(src),
            baseUrl = path[1] || '/',
            jsRe = /.js$/,
            modules = {};

        modules[baseUrl + 'core.js'] = {exports: Core};

        var require = function (path) {
            if (!jsRe.test(path)) path += '.js';
            path = baseUrl + path;
            var mod = modules[path];
            if (mod === undefined) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', path, false);
                xhr.send();

                if (xhr.status === 200) {
                    mod = {exports: {}};
                    try {
                        eval('(function (module, exports) { ' +
                            xhr.responseText +
                        '\n})(mod, mod.exports);//@ sourceURL=' + location.origin + '/' + path);
                    } catch (e) {
                        console.error('Error in module ' + path + ': ', e, e.stack);
                    }
                } else {
                    console.error([
                        'Failed loading module ' + path,
                        'Status: ' + xhr.status,
                        'State: ' + xhr.readyState
                    ].join('\n'));
                }

                modules[path] = mod;
            }

            return mod.exports;
        };
        require(path[2]);
    } else {
        module.exports = Core;
    }

})();