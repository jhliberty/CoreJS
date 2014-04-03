/* jshint -W058 */

var Core = require('../../core'),
    Events = require('../../events'),
    Router = require('../../router');

describe('Core', function () {
  var router = new Router;

  describe('inheritance', function () {

    it('should instantiate properly', function () {
      expect(router).toEqual(jasmine.any(Router));
      expect(router).toEqual(jasmine.any(Events));
      expect(router).toEqual(jasmine.any(Core));
    });

    it('should have a proper constructor', function () {
      expect(router.constructor).toBe(Router);
    });

    it('should have a proper superclass pointer', function () {
      expect(Events).toBe(router.constructor.superclass.constructor);
    });

    // TODO add case: user hasn't specified a constructor to Module.extend()
  });

  describe('core methods', function () {
    it('should have .extend()', function () {
      expect(typeof Router.extend).toBe('function');
      expect(typeof Events.extend).toBe('function');
      expect(typeof Core.extend).toBe('function');
    });

    it('should have .register()', function () {
      expect(typeof Router.register).toBe('function');
      expect(typeof Events.register).toBe('function');
      expect(typeof Core.register).toBe('function');
    });

    it('should have same methods for all', function () {
      expect(Core.extend).toBe(Events.extend);
      expect(Core.extend).toBe(Router.extend);
    });
  });

  describe('prototyped methods', function () {
    it('should prototype methods', function () {
      expect(router.on).toBe(Events.prototype.on);
      expect(router.on).toBe(router.constructor.superclass.on);
    });
  });

});
