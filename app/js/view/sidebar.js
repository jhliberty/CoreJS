var View        = require('view'),
    TweetBtn    = require('view/twitter-button'),
    FacebookBtn = require('view/facebook-button'),
    LinkedInBtn = require('view/linkedin-button');

var Sidebar = View.extend({

    constructor: ['router', function (router, options) {
        View.call(this, options);
        router.on('route', this.onRoute, this);

        this.$container.find('#share').append(
            (new TweetBtn   ).$container,
            (new FacebookBtn).$container,
            (new LinkedInBtn).$container
        );
    }],

    update: ['model', View.prototype.update],

    onRoute: function (route) {
        this.$container
            .find('a').removeClass('current')
            .filter('[href="#' + route + '"]').addClass('current');
    },

    template:
        '<a href="#" class="logo"></a>' +
        '{{#items}}' +
        '<div class="s">' +
            '<h4><a href="#{{title}}">{{title}}</a></h4>' +
            '<ul>' +
                '{{#items}}<li><a href="#{{title}}">{{title}}</a></li>{{/items}}' +
            '</ul>' +
        '</div>' +
        '{{/items}}' +
        '{{#combined}}' +
        '<div class="s">' +
            '<h4><a href="#{{title}}">{{title}}</a></h4>' +
        '</div>' +
        '{{/combined}}' +
        '<div id="share"><p>Spread the word!</p></div>'

});

module.exports = Sidebar;