/*!
 * CoreJS
 * http://corejs.github.io/
 * (c) Ivan Indamix; MIT License
 */

// this is not included in the compiled code
/** @define {boolean} */
var DEV_MODE = true;

(function (undefined) {
  'use strict';

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
        proto.constructor = function () {
          parent.apply(this, arguments)
        };
      }
      child = wrapper(proto.constructor);
    }

    C.prototype = parent.prototype;
    child.prototype = new C();
    C.prototype = undefined; // unlink parent.prototype to prevent memory leaks

    var props = Object.getOwnPropertyNames(proto);
    for (var i = props.length; i--;) {
      var desc = Object.getOwnPropertyDescriptor(proto, props[i]);
      desc.value = wrapper(desc.value);
      Object.defineProperty(child.prototype, props[i], desc);
    }

    child.extend = parent.extend;
    child.register = parent.register;
    child.unregister = parent.unregister;
    child.reset = parent.reset;

    child.prototype.constructor = child;
    child.superclass = parent.prototype;
    return child;
  };

  Core.register = function (name, entity) {
    if (typeof name === 'object' && entity === undefined) {
      for (var key in name) if (name.hasOwnProperty(key)) registry[key] = name[key];
    } else {
      registry[name] = entity;
    }
    return this;
  };

  Core.unregister = function (name) {
    delete registry[name];
    return this;
  };

  Core.reset = function () {
    registry = {};
    return this;
  };

  var wrapper = function (ia) {
    if (!isInjectorArray(ia)) return ia;

    var fn = ia.pop();

    return function () {
      var dependencies = new Array(ia.length);
      for (var i = dependencies.length; i--;) {
        dependencies[i] = registry[ ia[i] ];
      }
      return fn.apply(this, dependencies.concat(slice.call(arguments)));
    };
  };

  var isInjectorArray = function (a) {
    if (!Array.isArray(a) || a.length < 2 || typeof a[a.length - 1] !== 'function') return false;
    for (var i = a.length - 1; i--;) {
      if (typeof a[i] !== 'string') return false;
    }
    return true;
  };

  // this is not included in the compiled code
  if (DEV_MODE) {
    var script = document.scripts[document.scripts.length - 1],
        src = script.dataset ? script.dataset.main : script.getAttribute('data-main'),
        path = /(?:(.*\/))?(.*)/.exec(src),
        baseUrl = path[1] || '/',
        jsRe = /.js$/,
        modules = {};

    modules[baseUrl + 'core.js'] = {exports: Core};

    // for plugging in parsers, e.g. JSXTransformer or CoffeeScript etc.
    var parse = function (s) { return s };

    var require = function (path) {
      if (!jsRe.test(path)) path += '.js';
      path = baseUrl + path;
      var mod = modules[path];
      if (mod === undefined) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, false);
        xhr.send();

        if (xhr.status === 200 || xhr.status === 0) { // 0: local files (Cordova / Phonegap etc.)
          mod = {exports: {}};
          try {
            eval('(function (module, exports) { ' +
              parse(xhr.responseText) +
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