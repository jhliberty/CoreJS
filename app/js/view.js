var Events = require('events');

var View = Events.extend({

    constructor: function (options) {
        Events.call(this);
        options = options || {};
        this.$container = options.$container || $('<div/>');
        this.update();
    },

    update: ['tpl', function(tpl, model, template) {
        this.$container.html(tpl(template || this.template, model));
    }]

});
module.exports = View;