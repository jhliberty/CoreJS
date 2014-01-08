var View    = require('view'),
    Content = require('view/content'),
    Sidebar = require('view/sidebar');

var MainView = View.extend({

    constructor: ['router', function (router, options) {
        View.call(this, options);

        new Content({$container: this.$container.find('#content')});
        new Sidebar({$container: this.$container.find('#sidebar')});

        var eventType = 'ontouchstart' in window ? 'touchstart' : 'click',
            isSidebarOpen;

        var hide = function (e) {
            if (e && $(e.target).closest('#sidebar').length) return;
            this.$container
                .removeClass('sidebar-open')
                .off(eventType, hide);
            isSidebarOpen = false;
        }.bind(this);

        this.$container.find('.toggleBtn').on(eventType, function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (isSidebarOpen) {
                hide();
            } else {
                this.$container
                    .addClass('sidebar-open')
                    .on(eventType, hide);
                isSidebarOpen = true;
            }
        }.bind(this));

        router.on('route', hide, this);
    }],

    template:
        '<div class="container">' +
            '<div class="wrapper">' +
                '<div id="sidebar"></div>' +
                '<span class="toggleBtn"></span>' +
                '<div id="content"></div>' +
            '</div>' +
        '</div>'

});

module.exports = MainView;