/* jshint -W058 */

var Core = require('../../core');

describe('Dependency Injection', function () {
  it('should inject to constructor', function () {
    Core.register('shouldBeInjected', function (x) {
      return x * 3;
    });
    Core.register('injectNo2', function (x) {
      return x * x;
    });

    new (Core.extend({
      constructor: ['shouldBeInjected', function (injected) {
        expect(injected(123)).toBe(369);
        this.method();
      }],

      method: ['shouldBeInjected', 'injectNo2', function (inj, no2) {
        expect(inj(321)).toBe(963);
        expect(no2(5)).toBe(25);
      }]
    }));

  });

  it('should produce function of a smaller arity', function () {
    Core.register('dep1', 'dependency1');
    Core.register('dep2', 'dependency2');

    var o = new (Core.extend({
      constructor: function () {
      },

      method: ['dep1', 'dep2', function (d1, d2, d3, d4) {
        return [d1, d2, d3, d4].join(' ');
      }]
    }));
    expect(o.method('3', '4')).toBe('dependency1 dependency2 3 4');
  });
});

describe('Injector Array detection', function () {
  it('should detect a proper array', function () {
    var fn = function () {
        },
        proper = [
          ['a', 'b', fn],
          ['a', '', fn],
          ['', fn]
        ],
        improper = [
          ['a', 123, fn],
          ['a', fn, fn],
          123,
          [fn]
        ],
        i;

    for (i = proper.length; i--;) {
      expect(Core(proper[i].slice())).not.toEqual(proper[i]);
      expect(Core(proper[i].slice())).toEqual(jasmine.any(Function));
    }
    for (i = improper.length; i--;) {
      expect(Core(improper[i])).toEqual(improper[i]);
    }
  });
});

describe('DI registry', function () {
  it('Core.register() should register', function () {
    Core.register('newDependency', [3, 2, 1]);
    var fn = Core(['newDependency', function (d) {
      return d;
    }]);
    expect(fn()).toEqual([3, 2, 1]);
  });

  it('Core(name, fn) should register', function () {
    Core('theDep', 25);
    var fn = Core(['theDep', function (d) {
      return d;
    }]);
    expect(fn()).toBe(25);
  });

  it('should unregister', function () {
    var fn = Core(['newDependency', function (d) {
      return d;
    }]);
    Core.register('newDependency', [3, 2, 1]);
    Core.unregister('newDependency');
    expect(fn()).toBe(undefined);
  });

  it('should reset', function () {
    Core.register('resetDep1', [3, 2, 1]);
    Core.register('resetDep2', [4, 5, 6]);
    var fn = Core(['resetDep1', 'resetDep2', function (d1, d2) {
      return d1 + ' ' + d2;
    }]);
    expect(fn()).toEqual('3,2,1 4,5,6');

    Core.reset();
    expect(fn()).toEqual('undefined undefined');
  })
});

describe('Resolving dependencies', function () {
  it('Core(\'dep\') should return resolved dependency', function () {
    Core.register('depToBeResolved', [7, 7, 7]);
    expect(Core('depToBeResolved')).toEqual([7, 7, 7]);
  });

  it('Core([\'dep1\', \'dep2\']) should return array of resolved dependencies', function () {
    Core.register('depToBeResolved1', [1, 1, 1]);
    Core.register('depToBeResolved2', [2, 2, 2]);
    expect(Core(['depToBeResolved1', 'depToBeResolved2'])).toEqual([
      [1, 1, 1],
      [2, 2, 2]
    ]);
  })
});