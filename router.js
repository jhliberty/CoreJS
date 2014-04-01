var Events = require('events');

var Router = Events.extend({

  constructor: function Router(routes) {
    Events.call(this);
    this.onChange = this.onChange.bind(this);
    window.addEventListener('hashchange', this.onChange, false);
    setTimeout(this.onChange, 0);
    if (routes) this.routes = routes;
  },

  onChange: function () {
    var url = location.hash.substr(2),
        route, match;

    for (var i = 0; i < this.routes.length; ++i) {
      route = this.routes[i];
      if (match = url.match(route[0])) break;
    }

    if (match) this.trigger('route', route[1], match.slice(1));
  }

});

module.exports = Router;