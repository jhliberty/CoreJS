var Events = require('events');

var Router = Events.extend({

    constructor: function Router() {
        Events.call(this);
        this.onChange = this.onChange.bind(this);
        window.addEventListener('hashchange', this.onChange, false);
        setTimeout(this.onChange, 0);
    },

    onChange: function () {
        this.trigger('route', location.hash.substr(1));
    }

});

module.exports = Router;