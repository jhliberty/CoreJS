var View    = require('view'),
    Tooltip = require('view/tooltip');

var sub =
'{{#file}}<span class="file">{{file}}</span>{{/file}}' +
'{{#code}}<div class="pre">{{{code}}}</div>{{/code}}' +
'{{^code}}<div>{{{.}}}</div>{{/code}}';

var MainView = View.extend({

    constructor: function () {
        View.apply(this, arguments);
        this.$container.one('click', '.spread', function () {
            var $share = $('#share');
            $share.appendTo('#main');
            window.scrollTo(0, $share.offset().top);
        });

        new Tooltip ({selector: '.pre i'});
    },

    update: ['model', View.prototype.update],

    template:
        '<div id="sidebar"></div>' +
        '<div id="overview">' +
            '<div id="logoSquare"></div>' +
            '<div id="logo"></div>' +
            '<p class="desc">Modular JavaScript Framework</p>' +
            '<p>CoreJS solves problems that arise in&nbsp;every large web application:</p>' +
            '<ul>' +
            '{{#items}}' +
                '<li>' +
                    '<a href="#{{id}}" class="o{{id}}"><span>{{title}}</span></a>' +
                '</li>' +
            '{{/items}}' +
            '</ul>' +
        '</div>' +
        '<div id="main">' +
            '{{#items}}' +
                '<h2 id="{{id}}">{{title}}</h2>' +
                '{{{desc}}}' +
                '{{#items}}' +
                    '<h3 id="{{id}}">{{title}}</h3>' +
                    '{{#items}}' +
                        sub +
                    '{{/items}}' +
                '{{/items}}' +
            '{{/items}}' +

            '{{#combined}}' +
                '<h2 id="{{id}}">{{title}}</h2>' +
                '{{#items}}' + sub + '{{/items}}' +
            '{{/combined}}' +

            '<div class="conclusion">' +
            '{{#conclusion}}' +
                '<div>{{{.}}}</div>' +
            '{{/conclusion}}' +
            '</div>' +
        '</div>' +
        '<a href="https://github.com/CoreJS" class="gh" title="Fork me on GitHub">'

});

module.exports = MainView;