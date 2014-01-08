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
/*              '<div id="overview">' +
                    '<div class="col">' +
                        '<div id="logoSquare"></div>' +
                    '</div>' +
                    '<div class="col">' +
                        '<p class="desc">Modular JavaScript Framework</p>' +
                        '<div id="logo"></div>' +
                        '{{#features}}<p>{{.}}</p>{{/features}}' +
                    '</div>' +
                    '<p class="pr">CoreJS solves problems that arise in&nbsp;every large web application:</p>' +
                    '<ul>' +
                    '{{#items}}' +
                        '<li>' +
                            '<a href="#{{id}}" class="o{{id}}"><span>{{title}}</span></a>' +
                        '</li>' +
                    '{{/items}}' +
                    '</ul>' +
                '</div>' +*/
                '<span class="toggleBtn"></span>' +
                '<div id="content"></div>' +
            '</div>' +
        '</div>'

});

module.exports = MainView;