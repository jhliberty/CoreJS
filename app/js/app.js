var Events = require('events'),
    Router = require('router'),
    MainView = require('view/main-view'),
    Mustache = require('bower_components/mustache/mustache'),
    data = require('data');

var App = Events.extend({

    constructor: function () {
        Events.call(this);

        App
            .register('router', new Router)
            .register('tpl', Mustache.render)
            .register('model', data);

        new MainView({$container: $(document.body)});
    }

});

module.exports = App;
