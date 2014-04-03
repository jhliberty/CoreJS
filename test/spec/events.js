/* jshint -W058 */

var Events = require('../../events');

describe('Events', function () {

  it('should bind', function () {
    var ev = new Events,
        c = -10;

    ev.on('some-fancy-event', function (a, b) {
      c += a * 2 + b;
    });

    ev.trigger('some-fancy-event', 15, 1);
    expect(c).toBe(21);
    ev.trigger('some-fancy-event');
    expect(isNaN(c)).toBeTruthy();

  });

  it('should bind multiple', function () {
    var ev = new Events,
        i = 0;

    ev.on('evt1 evt3 evt2', function (x) {
      i += x;
    });

    ev.trigger('evt1', 1);
    expect(i).toBe(1);

    ev.trigger('evt2', 10);
    expect(i).toBe(11);

    ev.trigger('evt3', 25);
    expect(i).toBe(36);

    ev.trigger('evt1', -100);
    expect(i).toBe(-64);
  });

  it('should unbind', function () {
    var ev = new Events,
        fn1 = function (x) {
          i *= x;
        },
        i = 1;

    ev.on('toBeUnbound', fn1);
    ev.on('toPersist', fn1);

    ev.trigger('toBeUnbound', 25);
    expect(i).toBe(25);

    ev.off('toBeUnbound');
    ev.trigger('toBeUnbound', 25);
    expect(i).toBe(25);

    ev.trigger('toPersist', 100);
    expect(i).toBe(2500);
  });

  it('should unbind specific callback', function () {
    var ev = new Events,
        fn1 = function (x) {
          i *= x;
        },
        fn2 = function (x) {
          i += x;
        },
        i = 1;

    ev.on('doubleEvent', fn1);
    ev.on('doubleEvent', fn2);

    ev.trigger('doubleEvent', 2);
    expect(i).toBe(4);

    ev.off('doubleEvent', fn1);
    ev.trigger('doubleEvent', 2);
    expect(i).toBe(6);

    ev.off('doubleEvent', fn2);
    ev.trigger('doubleEvent', 2);
    expect(i).toBe(6);
  });

  it('should unbind multiple', function () {
    var ev = new Events,
        fn = function (x) {
          i *= x;
        },
        i = 1;

    ev.off('test', fn);

    ev.on('tbu1', fn);
    ev.on('tbu2', fn);
    ev.trigger('tbu1', 2);
    expect(i).toBe(2);
    ev.trigger('tbu2', 2);
    expect(i).toBe(4);

    ev.off();
    ev.trigger('tbu1', 2);
    expect(i).toBe(4);
    ev.trigger('tbu2', 2);
    expect(i).toBe(4);
  });


  it('should pass proper context', function () {
    var ev = new Events,
        fn = function () {
          return this.test;
        },
        context1 = {test: 1},
        context2 = {test: 2};

    ev.on('evt1', fn, context1);
    ev.on('evt2', fn, context2);
    expect(ev.trigger('evt1')).toEqual([1]);
    expect(ev.trigger('evt2')).toEqual([2]);
  });
});
