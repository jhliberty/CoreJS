var View    = require('view'),
    Tooltip = require('view/tooltip');

var MainView = View.extend({

    constructor: function () {
        View.apply(this, arguments);
        this.$container.one('click', '.spread', function () {
            var $share = $('#share');
            $share.appendTo('#main');
            window.scrollTo(0, $share.offset().top);
        });

        new Tooltip({selector: '.pre i'});
    },

    update: ['model', View.prototype.update],

    template:
         '<div id="overview">' +
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
        '</div>' +
        '<a href="https://github.com/CoreJS" class="gh" title="Fork me on GitHub"></a>' +
        '{{#items}}' +
            '<h2 id="{{id}}">{{title}}</h2>' +
            '{{{desc}}}' +
            '{{#items}}' +
                '<h3 id="{{id}}">{{title}}</h3>' +
                '{{>items}}' +
            '{{/items}}' +
        '{{/items}}' +

        '{{#combined}}' +
            '<h2 id="{{id}}">{{title}}</h2>' +
            '{{>items}}' +
        '{{/combined}}' +

        '<div class="conclusion">' +
        '{{#conclusion}}' +
            '<div>{{{.}}}</div>' +
        '{{/conclusion}}' +
        '</div>',

    partial: {
        items:
            '{{#items}}' +
                '{{#file}}<span class="file">{{file}}</span>{{/file}}' +
                '{{#code}}<div class="pre">{{{code}}}</div>{{/code}}' +
                '{{^code}}<div>{{{.}}}</div>{{/code}}' +
            '{{/items}}'
    }

});

module.exports = MainView;