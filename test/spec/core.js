/* jshint -W058 */

var Core = require('../../app/js/core'),
    Events = require('../../app/js/events'),
    App = require('../../app/js/app');

describe('Core', function () {
    var app = new App;

    describe('inheritance', function () {

        it('should instantiate properly', function () {
            expect(app).toEqual(jasmine.any(App));
            expect(app).toEqual(jasmine.any(Events));
            expect(app).toEqual(jasmine.any(Core));
        });

        it('should have proper constructor', function () {
            expect(app.constructor).toBe(App);
        });

        it('should have proper superclass pointer', function () {
            expect(Events).toBe(app.constructor.superclass.constructor);
        });

        // TODO AFTER RELEASE add case: user haven't specified a constructor to Module.extend()
    });

    describe('core methods', function () {
        it('should have .extend()', function () {
            expect(typeof App.extend).toBe('function');
            expect(typeof Events.extend).toBe('function');
            expect(typeof Core.extend).toBe('function');
        });

        it('should have .register()', function () {
            expect(typeof App.register).toBe('function');
            expect(typeof Events.register).toBe('function');
            expect(typeof Core.register).toBe('function');
        });

        it('should have same methods for all', function () {
            expect(Core.extend).toBe(Events.extend);
            expect(Core.extend).toBe(App.extend);
        });
    });

    describe('prototyped methods', function () {
        it('should prototype methods', function () {
            expect(app.on).toBe(Events.prototype.on);
            expect(app.on).toBe(app.constructor.superclass.on);
        });
    });

});
